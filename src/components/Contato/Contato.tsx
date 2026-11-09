"use client";

import { content } from "@/lib/content";
import { resolveCtaHref } from "@/lib/whatsapp";
import { Section } from "@/components/Section/Section";
import { Button } from "@/components/Button/Button";
import styles from "./Contato.module.css";

export function Contato() {
  const contato = content.secoes.contato;
  const { principal, secundario } = content.site.ctas;

  const mapSrc = `https://www.google.com/maps?q=${contato.endereco.lat},${contato.endereco.lng}&z=18&output=embed`;

  return (
    <Section id="contato" background="alt">
      <div className={styles.grid}>
        <div className={styles.actions}>
          <div className={styles.header}>
            <h2 className={styles.titulo}>{contato.titulo}</h2>
            <p className={styles.subtitulo}>{contato.subtitulo}</p>
          </div>

          <Button href={resolveCtaHref(principal)} variant="primario" size="lg" className={styles.actionButton}>
            {principal.texto}
          </Button>
          <Button href={resolveCtaHref(secundario)} variant="secundario" size="lg" className={styles.actionButton}>
            {secundario.texto}
          </Button>

          <address className={styles.endereco}>
            {contato.endereco.logradouro}
            <br />
            {contato.endereco.cidade} - {contato.endereco.uf}, {contato.endereco.cep}
            {contato.endereco.mapa_url && (
              <>
                <br />
                <a
                  href={contato.endereco.mapa_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.enderecoLink}
                >
                  Ver no Google Maps
                </a>
              </>
            )}
          </address>

          <ul className={styles.horarios}>
            {contato.horarios.map((horario) => (
              <li key={horario.dias}>
                <strong>{horario.dias}</strong> — {horario.horas}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.mapWrap}>
          <iframe
            className={styles.map}
            src={mapSrc}
            title="Mapa até a MultiMais Negócios"
            loading="lazy"
          />
        </div>
      </div>
    </Section>
  );
}
