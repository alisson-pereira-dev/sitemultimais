import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

// site.dominio ainda está vazio no content.json (domínio/hospedagem pendente —
// ver docs/tasks.md T6.2). example.com é o domínio reservado pra documentação/
// exemplos (RFC 2606) — só evita o build quebrar; TROCAR assim que o domínio
// real for confirmado.
const FALLBACK_BASE = "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl() ?? FALLBACK_BASE;

  const routes: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/privacidade", changeFrequency: "yearly", priority: 0.3 },
    { path: "/termos", changeFrequency: "yearly", priority: 0.3 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
