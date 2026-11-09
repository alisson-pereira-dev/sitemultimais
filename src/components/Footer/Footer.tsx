import Link from "next/link";
import { content } from "@/lib/content";
import { buildWhatsAppUrl, buildTelUrl } from "@/lib/whatsapp";
import { IconWhatsApp, IconTelefone, IconInstagram } from "@/components/Icons/Icons";
import styles from "./Footer.module.css";

export function Footer() {
  const footer = content.secoes.footer;
  const { nome, contato, redes } = content.site;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>{nome}</span>
            <p className={styles.descricao}>{footer.descricao_curta}</p>
          </div>

          {footer.colunas.map((coluna) => (
            <nav key={coluna.titulo} aria-label={coluna.titulo} className={styles.coluna}>
              <h3 className={styles.colunaTitulo}>{coluna.titulo}</h3>
              <ul>
                {coluna.links.map((link) => (
                  <li key={link.destino}>
                    <a href={link.destino}>{link.rotulo}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={styles.coluna}>
            <h3 className={styles.colunaTitulo}>Contato</h3>
            <ul>
              <li>
                <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  <IconWhatsApp width={16} height={16} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={buildTelUrl()}>
                  <IconTelefone width={16} height={16} />
                  {contato.telefone}
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.coluna}>
            <h3 className={styles.colunaTitulo}>Endereço</h3>
            <address className={styles.endereco}>
              {contato.endereco.logradouro}
              <br />
              {contato.endereco.cidade} - {contato.endereco.uf}, {contato.endereco.cep}
            </address>
          </div>

          {redes.instagram && (
            <div className={styles.coluna}>
              <h3 className={styles.colunaTitulo}>Redes sociais</h3>
              <ul>
                <li>
                  <a href={redes.instagram} target="_blank" rel="noopener noreferrer">
                    <IconInstagram width={16} height={16} />
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className={styles.bottom}>
          <ul className={styles.legais}>
            {footer.links_legais.map((link) => (
              <li key={link.destino}>
                <Link href={link.destino}>{link.rotulo}</Link>
              </li>
            ))}
          </ul>
          <p className={styles.copyright}>{footer.copyright}</p>
        </div>
      </div>

      <div className={styles.wordmarkWrap} aria-hidden="true">
        <p className={styles.wordmark}>{nome}</p>
      </div>
    </footer>
  );
}
