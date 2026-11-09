import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type Variant = "primario" | "secundario" | "terciario";
type Size = "md" | "lg";

interface ButtonProps extends Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

function isExternalDestino(href: string): boolean {
  return href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
}

export function Button({
  href,
  variant = "primario",
  size = "md",
  children,
  className,
  onClick,
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  if (isExternalDestino(href)) {
    const isTel = href.startsWith("tel:") || href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={isTel ? undefined : "_blank"}
        rel={isTel ? undefined : "noopener noreferrer"}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
