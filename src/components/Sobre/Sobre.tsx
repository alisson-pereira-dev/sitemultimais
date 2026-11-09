import type { CSSProperties } from "react";
import { content } from "@/lib/content";
import { Section } from "@/components/Section/Section";
import styles from "./Sobre.module.css";

const REPS = 3;
const ROWS = [
  { dir: "left", speed: "r1" },
  { dir: "right", speed: "r2" },
  { dir: "left", speed: "r3" },
  { dir: "right", speed: "r4" },
] as const;

// 2026-11-07: marquee de 4 faixas (foto + palavra, rolando sem parar), a
// pedido do cliente com arquivo de referência HTML/CSS/JS completo (mesmo
// padrão de fidelidade literal já usado em Vantagens/Reveal/Serviços).
// Substitui o layout anterior (foto squircle + título + parágrafo) por
// inteiro. Fotos reais recebidas em 2026-11-07 (`secoes.sobre.fotos`,
// `public/images/atendimento_human_0{1..5}.jpg`) — não há 1 foto fixa por
// palavra, o pool é distribuído entre as ocorrências renderizadas (cada
// faixa começa num ponto diferente do pool) pra dar variedade, como no
// arquivo de referência. Sem pool definido, cada item cai no fallback: um
// gradiente com as cores da marca via --c1/--c2 (mesma técnica do arquivo,
// só que com tokens do DS em vez de hex soltos).
const GRADIENTS: ReadonlyArray<{ c1: string; c2: string }> = [
  { c1: "var(--color-secondary)", c2: "var(--color-secondary-medium)" },
  { c1: "var(--color-primary)", c2: "var(--color-primary-soft)" },
  { c1: "var(--color-secondary-medium)", c2: "var(--color-secondary)" },
  { c1: "var(--color-primary-soft)", c2: "var(--color-primary)" },
];

export function Sobre() {
  const sobre = content.secoes.sobre;
  const frase = sobre.itens.map((item) => item.texto).join(" ");
  const fotos = sobre.fotos ?? [];

  const renderSet = (keyPrefix: string, rowOffset: number) =>
    Array.from({ length: REPS }, (_, repIndex) => repIndex).flatMap((repIndex) =>
      sobre.itens.map((item, itemIndex) => {
        const posicao = rowOffset + repIndex * sobre.itens.length + itemIndex;
        const foto = fotos.length > 0 ? fotos[posicao % fotos.length] : undefined;
        const gradient = GRADIENTS[itemIndex % GRADIENTS.length];
        return (
          <div className={styles.item} key={`${keyPrefix}-${repIndex}-${itemIndex}`}>
            {foto ? (
              // eslint-disable-next-line @next/next/no-img-element -- marquee decorativo repetido dezenas de vezes por linha; next/image geraria srcset redundante sem ganho (não é conteúdo crítico de LCP)
              <img className={styles.pic} src={foto.src} alt="" loading="lazy" decoding="async" />
            ) : (
              <span
                className={styles.pic}
                aria-hidden="true"
                style={{ "--c1": gradient.c1, "--c2": gradient.c2 } as CSSProperties}
              />
            )}
            <span className={item.destaque ? `${styles.txt} ${styles.destaque}` : styles.txt}>
              {item.texto}
            </span>
          </div>
        );
      })
    );

  return (
    <Section id="sobre" background="alt" className={styles.sectionBleed}>
      {/* leitor de tela recebe título + frase real uma única vez; as 4
          faixas abaixo são decorativas (texto repetido só pro efeito visual
          de rolagem), por isso aria-hidden */}
      <h2 className={styles.srOnly}>{sobre.titulo}</h2>
      <p className={styles.srOnly}>{frase}</p>

      <div className={styles.rows} aria-hidden="true">
        {ROWS.map((row, rowIndex) => (
          <div key={row.speed} className={`${styles.row} ${styles[row.dir]} ${styles[row.speed]}`}>
            <div className={styles.track}>
              {renderSet(`${row.speed}-a`, rowIndex * 2)}
              {renderSet(`${row.speed}-b`, rowIndex * 2)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
