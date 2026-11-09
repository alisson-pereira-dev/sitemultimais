import Image from "next/image";
import { isPendente } from "@/lib/content";
import styles from "./SquircleMedia.module.css";

interface SquircleMediaProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  /** squircle (32%/28%, padrão — reservado a fotos de pessoas no DS) ou panel
   * (retângulo arredondado full-bleed, usado só na Hero por decisão do cliente)
   * ou card (retângulo arredondado contido, usado no carrossel de Vantagens —
   * mesmo visual do panel, mas dimensionado pra largura do container, não a
   * viewport inteira; exceção documentada igual à do Hero, pedida pelo cliente
   * pra reproduzir o carrossel do site do Inter) */
  shape?: "squircle" | "panel" | "card";
}

export function SquircleMedia({ src, alt, priority, className, shape = "squircle" }: SquircleMediaProps) {
  const classes = [styles.frame, styles[shape], className].filter(Boolean).join(" ");
  // panel (Hero) ocupa a largura inteira da viewport; card fica contido no
  // container (até ~1200px); squircle fica numa coluna menor. Usar o sizes
  // errado faz o otimizador do Next servir uma imagem pequena demais,
  // esticada pelo navegador — pixelizada.
  const sizes =
    shape === "panel" ? "100vw" : shape === "card" ? "(min-width: 1024px) 1200px, 100vw" : "(min-width: 1024px) 480px, 100vw";

  if (isPendente(src)) {
    return (
      <div className={classes} role="img" aria-label={alt}>
        <div className={styles.placeholder}>
          <PlaceholderIcon />
        </div>
      </div>
    );
  }

  return (
    <div className={classes}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

function PlaceholderIcon() {
  return (
    <svg viewBox="0 0 24 24" width="56" height="56" aria-hidden="true" className={styles.icon}>
      <path
        fill="currentColor"
        d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z"
      />
    </svg>
  );
}
