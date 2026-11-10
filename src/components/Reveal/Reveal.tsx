"use client";

import { useEffect, useRef } from "react";
import { content } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Reveal.module.css";

// Tabela medida no site de referência (cliente, 2026-11-07): u = topo da
// seção ÷ altura da viewport, limitado a [-1, 1]; ty = deriva do título em
// px. Curva não é linear (inclina mais nas pontas) — por isso a tabela em
// vez de uma conta direta. 2026-11-10: roda em qualquer largura (reativado
// no mobile, mesmo modo que o desktop) — só não roda com reduced-motion
// (bloco estático, sem deriva — ver abaixo).
const TY_TABLE: [number, number][] = [
  [-1.0, -76.14],
  [-0.7945, -68.56],
  [-0.5675, -60.57],
  [-0.3405, -53.15],
  [-0.1135, -46.61],
  [0, -44.14],
  [0.1135, -41.67],
  [0.3405, -35.13],
  [0.5675, -27.71],
  [0.7945, -19.73],
  [1.0, -12.14],
];

function tyAt(u: number) {
  const clamped = Math.max(-1, Math.min(1, u));
  for (let i = 1; i < TY_TABLE.length; i++) {
    const [u1, t1] = TY_TABLE[i];
    if (clamped <= u1) {
      const [u0, t0] = TY_TABLE[i - 1];
      const k = (clamped - u0) / (u1 - u0);
      return t0 + (t1 - t0) * k;
    }
  }
  return TY_TABLE[TY_TABLE.length - 1][1];
}

export function Reveal() {
  const { titulo } = content.secoes.reveal;
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // o efeito (fundo fixo + deriva) roda em qualquer largura com motion
  // permitido — fora disso o CSS (ver Reveal.module.css) já cai sozinho pra
  // um bloco normal, sem position:fixed; aqui só garante o título parado
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    if (prefersReducedMotion) {
      title.style.transform = "";
      return;
    }

    let ticking = false;

    function update() {
      ticking = false;
      const section = sectionRef.current;
      if (!section || !title) return;
      const vh = window.innerHeight;
      const u = section.getBoundingClientRect().top / vh;
      title.style.transform = `translate(-50%, ${tyAt(u).toFixed(2)}px)`;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [prefersReducedMotion]);

  return (
    <div className={styles.reveal} ref={sectionRef}>
      <div className={styles.pinned}>
        <div className={styles.box}>
          <div className={styles.boxInner}>
            <div className={styles.titlePos}>
              <div className={styles.titleShift} ref={titleRef}>
                <h2 className={styles.titulo}>{titulo}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
