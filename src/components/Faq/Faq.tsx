"use client";

import { useState } from "react";
import { content } from "@/lib/content";
import { resolveCtaHref } from "@/lib/whatsapp";
import { Section } from "@/components/Section/Section";
import { Button } from "@/components/Button/Button";
import { IconChevronDown } from "@/components/Icons/Icons";
import styles from "./Faq.module.css";

export function Faq() {
  const faq = content.secoes.faq;
  const ctaPrincipal = content.site.ctas.principal;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <Section id="faq">
      {/* sem JS não dá pra abrir o accordion — todas as respostas ficam visíveis */}
      <noscript>
        <style>{`.${styles.panel} { grid-template-rows: 1fr !important; }`}</style>
      </noscript>

      <div className={styles.inner}>
        <div className={styles.side}>
          <h2 className={styles.titulo}>{faq.titulo}</h2>
          <Button href={resolveCtaHref(ctaPrincipal)} variant="primario" size="lg">
            {ctaPrincipal.texto}
          </Button>
        </div>

        <ul className={styles.lista}>
          {faq.perguntas.map((pergunta, index) => {
            const open = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <li key={pergunta.pergunta} className={styles.item}>
                <h3 className={styles.questionHeading}>
                  <button
                    id={buttonId}
                    type="button"
                    className={styles.question}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span>{pergunta.pergunta}</span>
                    <IconChevronDown
                      className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={styles.panel}
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className={styles.panelInner}>
                    <p>{pergunta.resposta}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
