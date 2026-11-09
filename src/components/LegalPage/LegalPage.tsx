import type { Cta } from "@/lib/content.types";
import { resolveCtaHref } from "@/lib/whatsapp";
import { Button } from "@/components/Button/Button";
import styles from "./LegalPage.module.css";

interface LegalSection {
  titulo: string;
  texto: string;
}

interface LegalPageProps {
  titulo: string;
  secoes: LegalSection[];
  contato: { titulo: string; texto: string; cta: Cta };
}

export function LegalPage({ titulo, secoes, contato }: LegalPageProps) {
  return (
    <div className={styles.wrap}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.banner} role="note">
            <strong>Documento em rascunho.</strong> Este texto foi gerado para estruturar a
            página e ainda não passou por revisão jurídica. Não deve ser considerado válido ou
            definitivo até confirmação da equipe responsável pela MultiMais Negócios.
          </div>

          <h1 className={styles.titulo}>{titulo}</h1>

          {secoes.map((secao) => (
            <section key={secao.titulo} className={styles.secao}>
              <h2 className={styles.secaoTitulo}>{secao.titulo}</h2>
              <p className={styles.secaoTexto}>{secao.texto}</p>
            </section>
          ))}

          <section className={styles.secao}>
            <h2 className={styles.secaoTitulo}>{contato.titulo}</h2>
            <p className={styles.secaoTexto}>{contato.texto}</p>
            <Button href={resolveCtaHref(contato.cta)} variant="primario" size="md" className={styles.contatoCta}>
              {contato.cta.texto}
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
