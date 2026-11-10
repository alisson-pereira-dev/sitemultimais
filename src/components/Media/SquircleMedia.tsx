import Image from "next/image";
import { UserRound } from "lucide-react";
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
          <UserRound width={56} height={56} strokeWidth={1.5} aria-hidden="true" className={styles.icon} />
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
