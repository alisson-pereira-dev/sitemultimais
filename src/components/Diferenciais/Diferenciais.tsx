"use client";

import { motion, type Variants } from "motion/react";
import { content } from "@/lib/content";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Section } from "@/components/Section/Section";
import { Card } from "@/components/Card/Card";
import { diferencialIcons, IconEscudo } from "@/components/Icons/Icons";
import styles from "./Diferenciais.module.css";

const EASE_STANDARD = [0.25, 1, 0.5, 1] as const;

export function Diferenciais() {
  const diferenciais = content.secoes.diferenciais;
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

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

  return (
    <Section id="diferenciais">
      <noscript>
        <style>{`.${styles.grid} * { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>

      <h2 className={styles.titulo}>{diferenciais.titulo}</h2>

      <motion.ul
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        {diferenciais.itens.map((diferencial) => {
          const Icon = diferencialIcons[diferencial.icone] ?? IconEscudo;
          return (
            <motion.li key={diferencial.titulo} variants={item}>
              <Card
                variant="diferencial"
                icon={<Icon />}
                title={diferencial.titulo}
                description={diferencial.descricao}
                imagem={diferencial.imagem}
              />
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
}
