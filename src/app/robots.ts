import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // só referencia o sitemap quando o domínio real estiver confirmado —
    // ver docs/tasks.md T6.2
    ...(base ? { sitemap: `${base}/sitemap.xml` } : {}),
  };
}
