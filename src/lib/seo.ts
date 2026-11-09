import { content } from "./content";

// site.dominio está vazio no content.json (domínio/hospedagem ainda pendente —
// ver docs/tasks.md T6.2). Enquanto isso, retorna undefined e quem usa decide
// o que fazer (ex.: robots.ts omite a diretiva `sitemap:`).
export function getSiteUrl(): string | undefined {
  const dominio = content.site.dominio;
  if (!dominio) return undefined;
  return dominio.startsWith("http") ? dominio : `https://${dominio}`;
}
