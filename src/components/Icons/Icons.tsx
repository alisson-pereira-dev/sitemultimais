import type { SVGProps } from "react";
import {
  Clock,
  Zap,
  Handshake,
  ShieldCheck,
  Banknote,
  Wallet,
  KeyRound,
  Landmark,
  Vault,
  CreditCard,
  AlertTriangle,
  Calendar,
  MessageCircle,
  Phone,
  MapPin,
  Camera,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

type IconProps = SVGProps<SVGSVGElement>;
type IconComponent = (props: IconProps) => React.JSX.Element;

// Biblioteca única de ícones do site: lucide-react (2026-11-10 — troca de
// todos os SVGs custom/inline por ícones da lib, pedido do cliente; os
// desenhos à mão anteriores saíam malformados em alguns tamanhos, ex. o
// glifo do WhatsApp no CTA flutuante). Mantém o traço fino (1.8, mais leve
// que o padrão 2 da lib) e `currentColor` — o container (círculo/quadrado
// colorido) continua vindo do CSS de cada seção, só o glifo interno mudou.
// 24px é o tamanho padrão (ícone "em card"); quem usa dentro de um botão
// circular passa width/height=20 explicitamente na chamada (Header, Faq,
// setas de carrossel, CTA flutuante — ver docs/componentes.md).
function icon(Lucide: LucideIcon): IconComponent {
  return function Icon(props: IconProps) {
    return <Lucide strokeWidth={1.8} size={24} aria-hidden="true" {...props} />;
  };
}

export const IconRelogio = icon(Clock);
export const IconPix = icon(Zap);
export const IconApertoDeMao = icon(Handshake);
export const IconEscudo = icon(ShieldCheck);
export const IconDinheiro = icon(Banknote);
export const IconCarteira = icon(Wallet);
export const IconChave = icon(KeyRound);
export const IconBanco = icon(Landmark);
export const IconCofre = icon(Vault);
export const IconCartao = icon(CreditCard);
export const IconAlerta = icon(AlertTriangle);
export const IconCalendario = icon(Calendar);
export const IconWhatsApp = icon(MessageCircle);
export const IconTelefone = icon(Phone);
export const IconMapaPin = icon(MapPin);
// Lucide é uma lib genérica, sem logos de marca — não existe ícone oficial
// do Instagram nela. Substituto semântico (câmera), sinalizando pro cliente
// em vez de inventar um glifo de marca por conta própria.
export const IconInstagram = icon(Camera);
export const IconChevronLeft = icon(ChevronLeft);
export const IconChevronRight = icon(ChevronRight);
export const IconChevronDown = icon(ChevronDown);

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
