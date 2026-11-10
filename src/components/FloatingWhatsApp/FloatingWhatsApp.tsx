"use client";

import { useEffect, useState } from "react";
import { content } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { IconWhatsApp } from "@/components/Icons/Icons";
import styles from "./FloatingWhatsApp.module.css";

export function FloatingWhatsApp() {
  // páginas sem Hero (404, privacidade, termos) não têm CTA próprio na
  // primeira dobra — inicializa já visível nesse caso, calculado uma vez no
  // mount (não dentro do efeito, pra não disparar um setState síncrono nele)
  const [heroOut, setHeroOut] = useState(
    () => typeof document !== "undefined" && !document.getElementById("inicio")
  );
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => setHeroOut(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // some antes do rodapé chegar perto o bastante de sobrepor o botão
  // (mesma técnica do observer acima, só que no fim da página) — margem
  // negativa do tamanho do próprio botão + respiro, pra esconder assim que
  // ele chegaria a cobrir o conteúdo, não só quando o rodapé já apareceu todo
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), {
      rootMargin: "0px 0px -88px 0px",
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = heroOut && !nearFooter;

  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.button} ${visible ? styles.visible : ""}`}
      aria-label={content.site.ctas.principal.texto}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <IconWhatsApp width={20} height={20} />
    </a>
  );
}
