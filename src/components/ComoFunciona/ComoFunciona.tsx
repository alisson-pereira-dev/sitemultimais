"use client";

import { motion, type Variants } from "motion/react";
import { content } from "@/lib/content";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { resolveCtaHref } from "@/lib/whatsapp";
import { Section } from "@/components/Section/Section";
import { Button } from "@/components/Button/Button";
import styles from "./ComoFunciona.module.css";

const EASE_STANDARD = [0.25, 1, 0.5, 1] as const;

export function ComoFunciona() {
  const comoFunciona = content.secoes.como_funciona;
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  const duration = prefersReducedMotion ? 0 : isDesktop ? 0.4 : 0.35;
  const stagger = prefersReducedMotion ? 0 : isDesktop ? 0.08 : 0.06;
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
    <Section id="como-funciona" background="dark" className={styles.section}>
      <noscript>
        <style>{`.${styles.lista} * { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>

      <div className={styles.header}>
        <h2 className={styles.titulo}>{comoFunciona.titulo}</h2>
        <p className={styles.subtitulo}>{comoFunciona.subtitulo}</p>
      </div>

      <motion.ol
        className={styles.lista}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        {comoFunciona.passos.map((passo) => (
          <motion.li key={passo.numero} className={styles.passo} variants={item}>
            <span className={styles.numero}>{passo.numero}</span>
            <h3 className={styles.passoTitulo}>{passo.titulo}</h3>
            <p className={styles.passoDescricao}>{passo.descricao}</p>
          </motion.li>
        ))}
      </motion.ol>

      <div className={styles.ctaWrap}>
        <Button href={resolveCtaHref(comoFunciona.cta)} variant="primario" size="lg">
          {comoFunciona.cta.texto}
        </Button>
      </div>
    </Section>
  );
}
