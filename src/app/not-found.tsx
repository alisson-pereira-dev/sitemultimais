import { content } from "@/lib/content";
import { resolveCtaHref } from "@/lib/whatsapp";
import { Button } from "@/components/Button/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  const { titulo, texto, cta } = content.microcopy.pagina_404;

  return (
    <div className={styles.wrap}>
      <div className="container">
        <span className={styles.etiqueta}>Erro 404</span>
        <h1 className={styles.titulo}>{titulo}</h1>
        <p className={styles.texto}>{texto}</p>
        <div className={styles.ctaGroup}>
          <Button href={resolveCtaHref(cta)} variant="primario" size="lg">
            {cta.texto}
          </Button>
          <Button href="/" variant="secundario" size="lg">
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  );
}
