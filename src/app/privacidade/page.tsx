import type { Metadata } from "next";
import { content } from "@/lib/content";
import { LegalPage } from "@/components/LegalPage/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidade",
};

const secoes = [
  {
    titulo: "Quais informações coletamos",
    texto:
      "Esta seção vai descrever, de forma clara, quais dados a MultiMais Negócios coleta quando você entra em contato pelo WhatsApp, telefone ou outros canais — por exemplo, nome e informações que você compartilha para simular um crédito.",
  },
  {
    titulo: "Como usamos essas informações",
    texto:
      "Esta seção vai explicar para que essas informações são usadas — principalmente para entender seu pedido e dar andamento ao atendimento.",
  },
  {
    titulo: "Com quem compartilhamos",
    texto:
      "Esta seção vai esclarecer se e com quem os dados são compartilhados, incluindo eventuais parceiros envolvidos na análise de crédito.",
  },
  {
    titulo: "Seus direitos",
    texto:
      "Esta seção vai listar os direitos garantidos pela legislação de proteção de dados e como exercê-los junto à MultiMais Negócios.",
  },
];

export default function PrivacidadePage() {
  return (
    <LegalPage
      titulo="Política de Privacidade"
      secoes={secoes}
      contato={{
        titulo: "Fale com a gente",
        texto: "Para dúvidas sobre esta política, fale com a MultiMais Negócios pelo WhatsApp.",
        cta: content.site.ctas.principal,
      }}
    />
  );
}
