"use client";

import { motion, type Variants } from "motion/react";
import { content } from "@/lib/content";
import { resolveCtaHref } from "@/lib/whatsapp";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Button } from "@/components/Button/Button";
import styles from "./CtaFinal.module.css";

const EASE_STANDARD = [0.25, 1, 0.5, 1] as const;

export function CtaFinal() {
  const ctaFinal = content.secoes.cta_final;
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 16;
  const duration = prefersReducedMotion ? 0 : 0.4;

  const reveal: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_STANDARD } },
  };

  return (
    <section id="cta-final" className={styles.section}>
      <noscript>
        <style>{`.${styles.card} { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>

      <div className="container">
        <motion.div
          className={styles.card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={reveal}
        >
          <h2 className={styles.headline}>{ctaFinal.headline}</h2>
          <p className={styles.subtexto}>{ctaFinal.subtexto}</p>
          <Button href={resolveCtaHref(ctaFinal.cta)} variant="primario" size="lg">
            {ctaFinal.cta.texto}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
