import type { Metadata } from "next";
import { content } from "@/lib/content";
import { LegalPage } from "@/components/LegalPage/LegalPage";

export const metadata: Metadata = {
  title: "Termos de Uso",
};

const secoes = [
  {
    titulo: "Sobre este site",
    texto:
      "Esta seção vai explicar que o site é um canal de apresentação dos serviços da MultiMais Negócios, sem formulário de contratação — todo atendimento acontece pelo WhatsApp ou telefone.",
  },
  {
    titulo: "Uso do conteúdo",
    texto:
      "Esta seção vai esclarecer as condições de uso das informações publicadas no site (textos, imagens e identidade visual).",
  },
  {
    titulo: "Simulações e atendimento",
    texto:
      "Esta seção vai deixar claro que simular não representa aprovação de crédito, e que as condições finais são definidas diretamente com a equipe da MultiMais Negócios durante o atendimento.",
  },
  {
    titulo: "Alterações nestes termos",
    texto:
      "Esta seção vai descrever como e quando estes termos podem ser atualizados.",
  },
];

export default function TermosPage() {
  return (
    <LegalPage
      titulo="Termos de Uso"
      secoes={secoes}
      contato={{
        titulo: "Fale com a gente",
        texto: "Para dúvidas sobre estes termos, fale com a MultiMais Negócios pelo WhatsApp.",
        cta: content.site.ctas.principal,
      }}
    />
  );
}
