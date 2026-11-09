import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import { content, isPendente } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp/FloatingWhatsApp";
import { StructuredData } from "@/components/StructuredData/StructuredData";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  // 300 adicionado pro título "light" da seção Vantagens (destaqueHeading) —
  // sem isso o navegador cai pro peso carregado mais próximo (600), não fica
  // "light" de verdade
  weight: ["300", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = getSiteUrl();
const ogImagem = content.seo.home.og_imagem;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: content.seo.home.titulo,
    template: `%s | ${content.site.nome}`,
  },
  description: content.seo.home.descricao,
  openGraph: {
    title: content.seo.home.titulo,
    description: content.seo.home.descricao,
    siteName: content.site.nome,
    locale: "pt_BR",
    type: "website",
    ...(siteUrl ? { url: siteUrl } : {}),
    // og_imagem.src ainda está "pendente" no content.json (sem foto real) — não
    // aponta pra uma URL quebrada enquanto isso
    ...(!isPendente(ogImagem.src)
      ? { images: [{ url: ogImagem.src, alt: ogImagem.alt }] }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: content.seo.home.titulo,
    description: content.seo.home.descricao,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { pular_para_conteudo } = content.microcopy.acessibilidade;

  return (
    <html lang={content.site.lang} className={`${sora.variable} ${inter.variable}`}>
      <body>
        <StructuredData />
        <a href="#conteudo" className="skip-link">
          {pular_para_conteudo}
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
