import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
type IconComponent = ComponentType<IconProps>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconRelogio(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Base>
  );
}

export function IconPix(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8.5 7.5 11 5a1.4 1.4 0 0 1 2 0l2.5 2.5M8.5 16.5 11 19a1.4 1.4 0 0 0 2 0l2.5-2.5" />
      <path d="M5 11l-1.6.1a1.4 1.4 0 0 0 0 1.8L5 13M19 11l1.6.1a1.4 1.4 0 0 1 0 1.8L19 13" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1.2" transform="rotate(45 12 12)" />
    </Base>
  );
}

export function IconApertoDeMao(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 12l3.5-3.5a2 2 0 0 1 2.8 0L11 10" />
      <path d="M21 12l-3.5-3.5a2 2 0 0 0-2.8 0L13 10" />
      <path d="M11 10l1.5 1.5a1.5 1.5 0 0 0 2.1-2.1" />
      <path d="M8 13l2.2 2.2a1.6 1.6 0 0 0 2.3 0l.3-.3" />
      <path d="M3 12v3M21 12v3" />
    </Base>
  );
}

export function IconEscudo(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3l7 3v5.2c0 4.3-3 7.4-7 9.3-4-1.9-7-5-7-9.3V6l7-3z" />
      <path d="M9.3 12l1.9 1.9 3.5-3.9" />
    </Base>
  );
}

export function IconDinheiro(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2.5" y="6.5" width="19" height="11" rx="2" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M5.5 9v0M18.5 15v0" />
    </Base>
  );
}

export function IconCarteira(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1h1.5A1.5 1.5 0 0 1 21 10.5v6A1.5 1.5 0 0 1 19.5 18H5a2 2 0 0 1-2-2V8z" />
      <path d="M14.5 14a1.5 1.5 0 1 1 0-3h5.5v3z" />
    </Base>
  );
}

export function IconChave(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="7.5" cy="14.5" r="3.5" />
      <path d="M10 12l9-9M15.5 6.5l2 2M13 9l2 2" />
    </Base>
  );
}

export function IconBanco(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 10l9-5 9 5" />
      <path d="M4.5 10v8M9 10v8M15 10v8M19.5 10v8" />
      <path d="M3 20h18" />
    </Base>
  );
}

export function IconCofre(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 9.8v0M7 7h0M17 7h0M7 17h0M17 17h0" />
    </Base>
  );
}

export function IconCartao(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.2" />
      <path d="M2.5 10h19" />
      <path d="M6 14.5h5" />
    </Base>
  );
}

export function IconAlerta(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16v0" />
    </Base>
  );
}

export function IconCalendario(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="M8 14h0M12 14h0M16 14h0" />
    </Base>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 17.5l-3 1 1-3a7.5 7.5 0 1 1 2 2z" />
      <path d="M9.2 9.3c0 3 2.5 5.5 5.5 5.5 .5 0 .9-.5.7-1l-.6-1.3a.8.8 0 0 0-1-.4l-.7.3a4 4 0 0 1-2-2l.3-.7a.8.8 0 0 0-.4-1l-1.3-.6c-.5-.2-1 .2-1 .7z" />
    </Base>
  );
}

// versão preenchida e autocontida (círculo + glifo branco) — pro selo do botão
// primário; o IconWhatsApp de linha fina acima fica ilegível apertado num
// badge pequeno, então essa é desenhada pra já nascer com o fundo circular.
export function IconWhatsAppBadge(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path
        d="M12 6.3a5.9 5.9 0 0 0-5.1 8.9l-.8 2.9 3-.8A5.9 5.9 0 1 0 12 6.3z"
        fill="none"
        stroke="#fff"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.6 9.7c0 2.6 2.1 4.7 4.7 4.7.4 0 .7-.4.6-.8l-.5-1.1a.7.7 0 0 0-.9-.3l-.5.2a3.3 3.3 0 0 1-1.7-1.7l.2-.5a.7.7 0 0 0-.3-.9l-1.1-.5c-.4-.2-.8.1-.8.6z"
        fill="#fff"
      />
    </svg>
  );
}

export function IconTelefone(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 4.5h3.2l1.3 3.6-1.9 1.7a12 12 0 0 0 6.6 6.6l1.7-1.9 3.6 1.3V19a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 3.5 6.1 1.5 1.5 0 0 1 5 4.5z" />
    </Base>
  );
}

export function IconMapaPin(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21s7-6.5 7-11.5a7 7 0 0 0-14 0C5 14.5 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </Base>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function IconChevronLeft(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M15 5l-7 7 7 7" />
    </Base>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 5l7 7-7 7" />
    </Base>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 9l7 7 7-7" />
    </Base>
  );
}

export const diferencialIcons: Record<string, IconComponent> = {
  relogio: IconRelogio,
  pix: IconPix,
  "aperto-de-mao": IconApertoDeMao,
  escudo: IconEscudo,
};

export const servicoIcons: Record<string, IconComponent> = {
  dinheiro: IconDinheiro,
  carteira: IconCarteira,
  chave: IconChave,
  banco: IconBanco,
  cofre: IconCofre,
  cartao: IconCartao,
};

export const vantagemIcons: Record<string, IconComponent> = {
  relogio: IconRelogio,
  escudo: IconEscudo,
  banco: IconBanco,
  alerta: IconAlerta,
  cartao: IconCartao,
  calendario: IconCalendario,
};
