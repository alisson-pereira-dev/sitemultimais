"use client";

import { useEffect, type RefObject } from "react";
import type gsap from "gsap";

// Parallax leve (N2) do fundo do Hero — GSAP ScrollTrigger, só nesta seção.
// Desktop apenas (>=1024px, mesmo breakpoint em que o Hero vira split 2 colunas)
// e nunca com prefers-reduced-motion. Carregado sob demanda (import dinâmico) para
// não pesar no caminho crítico do LCP; só anima `y` (transform) da camada decorativa,
// nunca a mídia do Hero (que é a imagem prioritária do LCP).
export function useHeroParallax(
  heroRef: RefObject<HTMLElement | null>,
  layerRef: RefObject<HTMLDivElement | null>,
  panelRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    let cancelled = false;
    let mm: gsap.MatchMedia | undefined;
    let idleHandle: number | undefined;

    const load = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled || !heroRef.current || !layerRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };
          const hero = heroRef.current;
          const layer = layerRef.current;
          const panel = panelRef.current;
          if (!isDesktop || reduceMotion || !hero || !layer) return;

          const distance = hero.offsetHeight * 0.08; // ≤10% da altura da seção

          gsap.to(layer, {
            y: distance,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          // Paralax de verdade: o painel do Hero acompanha o scroll mais
          // devagar que a página (atrasa) enquanto Métricas e Vantagens sobem
          // no ritmo normal — é esse descompasso de velocidade que cobre o
          // Hero aos poucos, em vez de um corte seco. `y` positivo cresce com
          // o scroll (via scrub), compensando parte do deslocamento normal
          // pra cima — o painel só "chega" na metade do percurso de quem
          // rolou a página. `position: relative`/`z-index` (Hero.module.css,
          // Metricas/Vantagens) garantem que quem vem depois pinte por cima
          // quando as duas coisas se sobrepuserem na tela.
          const vantagens = document.querySelector<HTMLElement>("#vantagens");
          if (panel && vantagens) {
            gsap.fromTo(
              panel,
              { y: 0 },
              {
                y: hero.offsetHeight * 0.35,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  endTrigger: vantagens,
                  end: "top top",
                  scrub: true,
                },
              }
            );
          }
        }
      );
    };

    // adia o fetch do GSAP até o navegador ficar ocioso — não compete com o
    // conteúdo crítico (texto/CTA/mídia) do Hero pelo LCP.
    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(() => void load());
    } else {
      idleHandle = window.setTimeout(() => void load(), 200);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined) {
        if (typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleHandle);
        } else {
          window.clearTimeout(idleHandle);
        }
      }
      mm?.revert();
    };
  }, [heroRef, layerRef, panelRef]);
}
