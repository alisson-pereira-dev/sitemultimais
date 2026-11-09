"use client";

import { useEffect, useState } from "react";
import { content } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { IconWhatsApp } from "@/components/Icons/Icons";
import styles from "./FloatingWhatsApp.module.css";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) {
      // páginas sem Hero (404, privacidade, termos) não têm CTA próprio na
      // primeira dobra — mostra o botão direto.
      const showByDefault = () => setVisible(true);
      showByDefault();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

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
      <IconWhatsApp width={28} height={28} />
    </a>
  );
}
