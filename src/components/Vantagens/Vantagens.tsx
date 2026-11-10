"use client";

import { Fragment, type TouchEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { content } from "@/lib/content";
import { resolveCtaHref } from "@/lib/whatsapp";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Section } from "@/components/Section/Section";
import { Button } from "@/components/Button/Button";
import { SquircleMedia } from "@/components/Media/SquircleMedia";
import { vantagemIcons, IconEscudo, IconChevronLeft, IconChevronRight } from "@/components/Icons/Icons";
import styles from "./Vantagens.module.css";

// Geometria/tempo do carrossel: valores literais tirados do arquivo de
// referência enviado pelo cliente (dono do slider), não dos tokens do DS —
// exceção pontual documentada, igual a `docs/sections/vantagens.md` explica.
const GAP = 16;
const INACTIVE_DESKTOP = 253;
const SMALL_BREAKPOINT = 700;
const TRANSITION = "left .5s cubic-bezier(.4,0,.2,1), width .5s cubic-bezier(.4,0,.2,1)";

// quebra de linha vem do próprio content.json ("\n"), não fixada no
// componente — `<br/>` real (não CSS) pra manter o degradê contínuo entre as
// linhas (box-decoration-break:slice do navegador trata quebra por <br/>
// igual a quebra por wrap natural)
function renderLines(text: string) {
  return text.split("\n").map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}

function computeLayout(viewportWidth: number, pos: number[]) {
  // <700px: 1 card em largura quase total por vez — os recolhidos ficam
  // fora da tela (sem "espiar" parcialmente, que ficava ilegível em 360–430px
  // com os valores literais do arquivo de referência, ver docs/sections/
  // vantagens.md item 10). Troca por swipe ou pelos dots (ver .dots).
  if (viewportWidth < SMALL_BREAKPOINT) {
    return {
      widths: pos.map(() => viewportWidth),
      lefts: pos.map((p) => (p === 0 ? 0 : viewportWidth)),
    };
  }

  const active = viewportWidth - 2 * (INACTIVE_DESKTOP + GAP);

  return {
    widths: pos.map((p) => (p === 0 ? active : INACTIVE_DESKTOP)),
    lefts: pos.map((p) => (p === 0 ? 0 : active + GAP + (p - 1) * (INACTIVE_DESKTOP + GAP))),
  };
}

export function Vantagens() {
  const { subtitulo, destaque, slides, transicao, cta } = content.secoes.vantagens;
  const prefersReducedMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<number[]>([]);
  const touchStartX = useRef<number | null>(null);

  const [pos, setPos] = useState(() => slides.map((_, i) => i));
  const [layout, setLayout] = useState<{ widths: number[]; lefts: number[] } | null>(null);
  // começa `true`: o 1º layout aplicado não deve animar (ver efeitos abaixo)
  const [instant, setInstant] = useState(true);
  // controla a exibição dos dots (só no layout de 1 card por vez, <700px)
  const [isSmall, setIsSmall] = useState(false);

  const n = slides.length;

  // mantém a ref sincronizada pro handler de resize (fora do ciclo de render)
  // sempre ler a fila mais atual, sem precisar listar `pos` nas deps do efeito
  // de resize (que só deve rodar uma vez, no mount)
  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  // aplica o layout sempre que a fila (pos) muda — roda no mount e em cada rotate()
  useLayoutEffect(() => {
    const vw = viewportRef.current?.clientWidth;
    if (vw) {
      setLayout(computeLayout(vw, pos));
      setIsSmall(vw < SMALL_BREAKPOINT);
    }
  }, [pos]);

  // religa a transição depois de 2 requestAnimationFrame — mesma técnica do
  // arquivo de referência pra não animar o layout inicial
  useEffect(() => {
    const ids: number[] = [];
    ids.push(
      requestAnimationFrame(() => {
        ids.push(requestAnimationFrame(() => setInstant(false)));
      })
    );
    return () => ids.forEach(cancelAnimationFrame);
  }, []);

  // resize: desliga a transição, recalcula, religa depois de 2 rAF
  useEffect(() => {
    function onResize() {
      setInstant(true);
      const vw = viewportRef.current?.clientWidth;
      if (vw) {
        setLayout(computeLayout(vw, posRef.current));
        setIsSmall(vw < SMALL_BREAKPOINT);
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setInstant(false));
      });
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // avança k posições: o card em destaque vai pro fim da fila, o próximo assume
  function rotate(k: number) {
    setPos((prev) => prev.map((p) => ((((p - k) % n) + n) % n)));
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const dx = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) rotate(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  }

  const transition = prefersReducedMotion || instant ? "none" : TRANSITION;

  return (
    <Section id="vantagens" className={styles.overlap}>
      <noscript>
        <style>{`.${styles.slide} { position: relative !important; width: 100% !important; left: auto !important; }`}</style>
      </noscript>

      <div className={styles.header}>
        <h1 className={styles.subtituloHeading}>
          <span className={styles.gradientBlue}>{renderLines(subtitulo)}</span>
        </h1>
        <h2 className={styles.destaqueHeading}>
          <span className={styles.gradientOrange}>{renderLines(destaque)}</span>
        </h2>
      </div>

      <div
        className={`${styles.viewport} ${layout ? styles.viewportReady : ""}`}
        ref={viewportRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => {
          const Icon = vantagemIcons[slide.icone] ?? IconEscudo;
          const isActive = pos[index] === 0;
          const style = layout
            ? { position: "absolute" as const, left: layout.lefts[index], width: layout.widths[index], transition }
            : undefined;

          return (
            <div key={slide.titulo} className={styles.slide} style={style}>
              {/* <article>/<div>+onClick no arquivo de referência — trocado
                  por <button> aqui (sem nenhuma mudança visual) só pra manter
                  o card operável por teclado, regra de acessibilidade AA do
                  CLAUDE.md */}
              <button
                type="button"
                className={`${styles.card} ${isActive ? styles.active : ""}`}
                disabled={isActive}
                aria-label={isActive ? undefined : `Destacar: ${slide.titulo}`}
                onClick={() => !isActive && rotate(pos[index])}
              >
                <div className={styles.cardInner}>
                  <SquircleMedia
                    shape="card"
                    src={slide.midia.src}
                    alt={slide.midia.alt}
                    className={styles.media}
                  />

                  <p className={styles.cardTitulo}>{slide.titulo}</p>

                  <span className={styles.chip}>
                    <span className={styles.chipIcon}>
                      <Icon width={24} height={24} />
                    </span>
                    <span className={styles.srOnly}>{slide.legenda}</span>
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {isSmall && n > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Selecionar card">
          {slides.map((slide, index) => {
            const isActive = pos[index] === 0;
            return (
              <button
                key={slide.titulo}
                type="button"
                className={`${styles.dot} ${isActive ? styles.dotActive : ""}`}
                role="tab"
                aria-selected={isActive}
                aria-label={`Mostrar: ${slide.titulo}`}
                onClick={() => !isActive && rotate(pos[index])}
              />
            );
          })}
        </div>
      )}

      <p className={styles.transicao}>{transicao}</p>

      <div className={styles.controls}>
        <Button href={resolveCtaHref(cta)} variant="primario" size="lg">
          {cta.texto}
        </Button>

        <div className={styles.arrows}>
          <button type="button" className={styles.arrow} aria-label="Slide anterior" onClick={() => rotate(-1)}>
            <IconChevronLeft width={20} height={20} />
          </button>
          <button type="button" className={styles.arrow} aria-label="Próximo slide" onClick={() => rotate(1)}>
            <IconChevronRight width={20} height={20} />
          </button>
        </div>
      </div>
    </Section>
  );
}
