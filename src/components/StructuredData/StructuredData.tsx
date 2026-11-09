import { content } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export function StructuredData() {
  const { nome, contato } = content.site;
  const { endereco, telefone } = contato;
  const { tipo } = content.seo.home.schema;
  const siteUrl = getSiteUrl();

  // horarios tem validar:true (só quarta-feira confirmada pelo cliente) — não
  // declaramos openingHoursSpecification aqui pra não apresentar um horário não
  // confirmado como fato pro Google. Mesma lógica pra priceRange: sem tabela de
  // valores confirmada, não entra no schema.
  const schema = {
    "@context": "https://schema.org",
    "@type": tipo,
    name: nome,
    telephone: telefone,
    address: {
      "@type": "PostalAddress",
      streetAddress: endereco.logradouro,
      addressLocality: endereco.cidade,
      addressRegion: endereco.uf,
      postalCode: endereco.cep,
      addressCountry: "BR",
    },
    ...(siteUrl ? { url: siteUrl } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
