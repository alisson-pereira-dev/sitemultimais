import type { ReactNode } from "react";
import Image from "next/image";
import type { Media } from "@/lib/content.types";
import styles from "./Card.module.css";

interface CardProps {
  variant: "diferencial";
  icon: ReactNode;
  title: string;
  description: string;
  /** ilustração decorativa opcional, alinhada ao canto inferior direito do card */
  imagem?: Media;
}

export function Card({ variant, icon, title, description, imagem }: CardProps) {
  return (
    <div className={`${styles.card} ${styles[variant]} ${imagem ? styles.hasImage : ""}`}>
      <div className={styles.content}>
        <div className={styles.iconWrap}>{icon}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      {imagem && (
        <div className={styles.illustrationWrap}>
          <Image
            src={imagem.src}
            alt={imagem.alt}
            aria-hidden={imagem.alt === "" ? "true" : undefined}
            fill
            sizes="170px"
            className={styles.illustration}
          />
        </div>
      )}
    </div>
  );
}
