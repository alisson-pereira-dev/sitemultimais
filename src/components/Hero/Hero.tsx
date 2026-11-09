"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "motion/react";
import { content } from "@/lib/content";
import { resolveCtaHref } from "@/lib/whatsapp";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Button } from "@/components/Button/Button";
import { SquircleMedia } from "@/components/Media/SquircleMedia";
import { IconMapaPin } from "@/components/Icons/Icons";
import { useHeroParallax } from "./useHeroParallax";
import styles from "./Hero.module.css";

const EASE_STANDARD = [0.25, 1, 0.5, 1] as const;

export function Hero() {
  const hero = content.secoes.hero;
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useHeroParallax(heroRef, parallaxLayerRef, panelRef);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const duration = prefersReducedMotion ? 0 : isDesktop ? 0.4 : 0.3;
  const stagger = prefersReducedMotion ? 0 : isDesktop ? 0.08 : 0.05;
  const distance = prefersReducedMotion ? 0 : 16;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_STANDARD } },
  };

  return (
    <section id="inicio" ref={heroRef} className={styles.hero}>
      {/* sem JS, o conteúdo fica visível (sobrepõe o estado inicial do Motion) */}
      <noscript>
        <style>{`.${styles.content} * { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>

      <div className={styles.panel} ref={panelRef}>
        <SquircleMedia
          shape="panel"
          src={hero.midia.src}
          alt={hero.midia.alt}
          className={styles.mediaBg}
          priority
        />
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.parallaxLayer} ref={parallaxLayerRef} aria-hidden="true">
          <span className={styles.glowOne} />
        </div>

        <div className={`container ${styles.inner}`}>
          <motion.div
            className={styles.content}
            initial="hidden"
            animate="visible"
            variants={container}
          >
            <motion.h1 className={styles.headline} variants={item}>
              {hero.headline}
            </motion.h1>
            <motion.p className={styles.subheadline} variants={item}>
              {hero.subheadline}
            </motion.p>
            <motion.div className={styles.ctaGroup} variants={item}>
              <Button href={resolveCtaHref(hero.cta)} variant="primario" size="lg">
                {hero.cta.texto}
              </Button>
              <Button
                href={resolveCtaHref(hero.cta_secundario)}
                variant="secundario"
                size="lg"
                className={styles.ctaSecundario}
              >
                {hero.cta_secundario.texto}
              </Button>
            </motion.div>
            <motion.p className={styles.destaque} variants={item}>
              <IconMapaPin width={18} height={18} aria-hidden="true" />
              {hero.destaque}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
