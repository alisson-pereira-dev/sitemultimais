"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/effect-creative";
import { content } from "@/lib/content";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Section } from "@/components/Section/Section";
import { Button } from "@/components/Button/Button";
import { servicoIcons, IconCartao, IconChevronLeft, IconChevronRight } from "@/components/Icons/Icons";
import styles from "./Servicos.module.css";

const EASE_STANDARD = [0.25, 1, 0.5, 1] as const;

export function Servicos() {
  const servicos = content.secoes.servicos;
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  // efeito "creative" 3D (ver baixo) só roda ≥1100px + motion permitido —
  // abaixo disso, ou sem JS, o carrossel simples (scroll nativo) é tudo que
  // existe, já estava assim antes dessa tarefa
  const canUseCreative = useIsDesktop("(min-width: 1100px)") && !prefersReducedMotion;

  const trackRef = useRef<HTMLUListElement>(null);
  const swiperElRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  const duration = prefersReducedMotion ? 0 : isDesktop ? 0.4 : 0.35;
  const stagger = prefersReducedMotion ? 0 : 0.06;
  const distance = prefersReducedMotion ? 0 : 16;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_STANDARD } },
  };

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const amount = (card?.offsetWidth ?? track.clientWidth * 0.8) + 24;
    track.scrollBy({
      left: amount * direction,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  // Carrossel Swiper (effect:'creative') — exceção de motion pedida
  // explicitamente pelo cliente com arquivo de referência completo (não é
  // uma das 10 receitas padrão de 09-MOTION). Carregado sob demanda: só
  // busca a lib quando as condições acima (desktop largo + motion permitido)
  // são satisfeitas, então quem recebe o fallback nunca baixa esse JS.
  useEffect(() => {
    if (!canUseCreative || !swiperElRef.current) return;

    let cancelled = false;

    (async () => {
      const [{ Swiper }, { EffectCreative }] = await Promise.all([import("swiper"), import("swiper/modules")]);
      if (cancelled || !swiperElRef.current) return;

      // parâmetros copiados do arquivo de referência do cliente — não alterar
      swiperRef.current = new Swiper(swiperElRef.current, {
        modules: [EffectCreative],
        effect: "creative",
        speed: 850,
        slidesPerView: "auto",
        spaceBetween: 0,
        loop: true,
        grabCursor: true,
        threshold: 5,
        watchSlidesProgress: true,
        creativeEffect: {
          limitProgress: 6,
          shadowPerProgress: false,
          progressMultiplier: 1,
          perspective: true,
          prev: { translate: [0, 0, -400], rotate: [0, 0, 0], opacity: 0, scale: 1, origin: "center" },
          next: { translate: ["100%", 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
        },
      });
      if (!cancelled) setSwiperReady(true);
    })();

    return () => {
      cancelled = true;
      swiperRef.current?.destroy(true, true);
      swiperRef.current = null;
      setSwiperReady(false);
    };
  }, [canUseCreative]);

  if (canUseCreative) {
    return (
      <Section id="servicos" background="alt" className={styles.sectionBleed}>
        <div className={styles.creative}>
          <div className={styles.left}>
            <h2 className={styles.creativeTitulo}>{servicos.titulo}</h2>
            <p className={styles.subtitulo}>{servicos.subtitulo}</p>
            <Button
              href={buildWhatsAppUrl("Olá! Quero conhecer os serviços da MultiMais.")}
              variant="primario"
              size="lg"
            >
              {content.site.ctas.principal.texto}
            </Button>
          </div>

          <div className={styles.right}>
            {/* "swiper"/"swiper-wrapper"/"swiper-slide" são nomes de classe que
                a própria lib Swiper procura no DOM — têm que ficar como string
                literal, não processados pelo CSS Module (senão o seletor
                interno da lib não bate com a classe renderizada) */}
            <div className={`swiper ${styles.swiperEl}`} ref={swiperElRef}>
              <div className="swiper-wrapper">
                {servicos.itens.map((servico) => {
                  const Icon = servicoIcons[servico.icone] ?? IconCartao;
                  return (
                    <div className={`swiper-slide ${styles.slide}`} key={servico.nome}>
                      <a
                        className={styles.creativeCard}
                        href={buildWhatsAppUrl(servico.cta.mensagem)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={servico.cta.texto}
                      >
                        {servico.imagem ? (
                          <Image
                            src={servico.imagem.src}
                            alt=""
                            fill
                            sizes="372px"
                            className={styles.cardBg}
                          />
                        ) : (
                          <span className={styles.cardBgGradient} aria-hidden="true" />
                        )}
                        <span className={styles.cardShade} aria-hidden="true" />
                        <div className={styles.cardTxt}>
                          <span className={styles.cardIcon} aria-hidden="true">
                            <Icon />
                          </span>
                          <h3 className={styles.creativeCardTitulo}>{servico.nome}</h3>
                          <span className={styles.read}>
                            Simular
                            <IconChevronRight width={18} height={18} />
                          </span>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.nav}>
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Serviço anterior"
                disabled={!swiperReady}
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <IconChevronLeft width={20} height={20} />
              </button>
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Próximo serviço"
                disabled={!swiperReady}
                onClick={() => swiperRef.current?.slideNext()}
              >
                <IconChevronRight width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="servicos" background="alt">
      <noscript>
        <style>{`.${styles.track} * { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>

      <div className={styles.header}>
        <div>
          <h2 className={styles.titulo}>{servicos.titulo}</h2>
          <p className={styles.subtitulo}>{servicos.subtitulo}</p>
        </div>
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Serviço anterior"
            onClick={() => scrollByCard(-1)}
          >
            <IconChevronLeft width={20} height={20} />
          </button>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Próximo serviço"
            onClick={() => scrollByCard(1)}
          >
            <IconChevronRight width={20} height={20} />
          </button>
        </div>
      </div>

      <div className={styles.carousel}>
        <motion.ul
          ref={trackRef}
          className={styles.track}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {servicos.itens.map((servico) => {
            const Icon = servicoIcons[servico.icone] ?? IconCartao;
            return (
              <motion.li key={servico.nome} className={styles.item} variants={item}>
                <a
                  className={styles.card}
                  href={buildWhatsAppUrl(servico.cta.mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={servico.cta.texto}
                >
                  {servico.imagem && (
                    <div className={styles.cardMedia}>
                      <Image
                        src={servico.imagem.src}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 78vw"
                        className={styles.cardMediaImg}
                      />
                      <span className={styles.cardIconBadge} aria-hidden="true">
                        <Icon />
                      </span>
                    </div>
                  )}
                  <div className={styles.cardBody}>
                    {!servico.imagem && (
                      <div className={styles.iconWrap}>
                        <Icon />
                      </div>
                    )}
                    <h3 className={styles.cardTitulo}>{servico.nome}</h3>
                    <p className={styles.cardDescricao}>{servico.descricao_curta}</p>
                    <span className={styles.link} aria-hidden="true">
                      Simular
                      <IconChevronRight width={16} height={16} />
                    </span>
                  </div>
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
        <div className={styles.fade} aria-hidden="true" />
      </div>
    </Section>
  );
}
