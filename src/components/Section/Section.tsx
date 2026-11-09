import type { ReactNode } from "react";
import styles from "./Section.module.css";

interface SectionProps {
  id: string;
  background?: "default" | "alt" | "dark";
  className?: string;
  children: ReactNode;
}

export function Section({ id, background = "default", className, children }: SectionProps) {
  const classes = [styles.section, background !== "default" ? styles[background] : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes}>
      <div className="container">{children}</div>
    </section>
  );
}
