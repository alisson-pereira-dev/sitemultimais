"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { content, isPendente } from "@/lib/content";
import { resolveCtaHref } from "@/lib/whatsapp";
import { Button } from "@/components/Button/Button";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const { menu, ctas } = content.site;
  const a11y = content.microcopy.acessibilidade;
  // só a home tem a Hero escura logo abaixo do header; nas outras páginas o
  // header começa direto sobre fundo claro, então não faz sentido texto branco
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) firstLinkRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${overHero ? styles.overHero : ""}`}
    >
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.logo} aria-label={content.site.nome}>
          {isPendente(content.site.logo.src) ? (
            <>
              <span className={styles.logoMark} aria-hidden="true">
                M+
              </span>
              <span className={styles.logoText}>{content.site.nome}</span>
            </>
          ) : (
            (() => {
              // variante branca sobre a Hero (fundo escuro, antes de rolar) —
              // a colorida fica ilegível em cima da foto; depois de rolar
              // (fundo claro do header) volta pra colorida normal
              const logo = overHero && content.site.logo_branco ? content.site.logo_branco : content.site.logo;
              return (
                <Image
                  src={logo.src}
                  alt=""
                  width={logo.width ?? 1774}
                  height={logo.height ?? 887}
                  className={styles.logoImage}
                  priority
                />
              );
            })()
          )}
        </a>

        <nav className={styles.nav} aria-label="Principal">
          <ul>
            {menu.map((item) => (
              <li key={item.destino}>
                <a href={item.destino}>{item.rotulo}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href={resolveCtaHref(ctas.principal)} variant="primario" size="md">
            {ctas.principal.texto}
          </Button>

          <button
            ref={toggleRef}
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? a11y.fechar_menu : a11y.abrir_menu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X width={20} height={20} strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <Menu width={20} height={20} strokeWidth={1.8} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        className={`${styles.panel} ${menuOpen ? styles.panelOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!menuOpen}
      >
        <ul>
          {menu.map((item, index) => (
            <li key={item.destino}>
              <a
                href={item.destino}
                ref={index === 0 ? firstLinkRef : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.rotulo}
              </a>
            </li>
          ))}
        </ul>
        <Button
          href={resolveCtaHref(ctas.principal)}
          variant="primario"
          size="lg"
          className={styles.panelCta}
          onClick={() => setMenuOpen(false)}
        >
          {ctas.principal.texto}
        </Button>
      </div>
    </header>
  );
}
