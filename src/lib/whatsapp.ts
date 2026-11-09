import type { Cta } from "./content.types";
import { content } from "./content";

export function buildWhatsAppUrl(mensagem?: string): string {
  const { numero, mensagem_padrao } = content.site.contato.whatsapp;
  const texto = mensagem ?? mensagem_padrao;
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

export function buildTelUrl(): string {
  return `tel:${content.site.contato.telefone.replace(/[^\d+]/g, "")}`;
}

export function resolveCtaHref(cta: Cta): string {
  if (cta.tipo === "whatsapp") return buildWhatsAppUrl();
  if (cta.tipo === "telefone") return buildTelUrl();
  return cta.destino;
}
