import { content } from "@/lib/content";
import styles from "./Metricas.module.css";

// cada metade da trilha precisa ser pelo menos tão larga quanto o viewport,
// senão o loop (-50%) expõe trilho vazio em telas largas antes do próximo
// grupo entrar — repete os 4 itens N vezes por metade pra garantir isso
// (mesma receita usada em Sobre.tsx)
const REPS = 3;

export function Metricas() {
  const { itens } = content.secoes.metricas;

  const renderGroup = (keyPrefix: string) =>
    Array.from({ length: REPS }, (_, repIndex) => repIndex).flatMap((repIndex) =>
      itens.map((item, index) => (
        <div
          className={repIndex === 0 ? styles.item : `${styles.item} ${styles.itemExtra}`}
          key={`${keyPrefix}-${repIndex}-${index}`}
        >
          <span className={styles.valor}>{item.valor}</span>
          <span className={styles.descricao}>{item.descricao}</span>
        </div>
      ))
    );

  return (
    <section className={styles.section} aria-label="Números da MultiMais Negócios">
      {/* leitor de tela recebe a lista real uma única vez; o slide abaixo é
          decorativo (grupo duplicado pra loop sem costura), por isso aria-hidden */}
      <ul className={styles.srList}>
        {itens.map((item) => (
          <li key={item.descricao}>
            {item.valor} — {item.descricao}
          </li>
        ))}
      </ul>

      <div className={styles.viewport} aria-hidden="true">
        <div className={styles.track}>
          <div className={styles.group}>{renderGroup("a")}</div>
          <div className={`${styles.group} ${styles.groupDuplicado}`}>{renderGroup("b")}</div>
        </div>
      </div>
    </section>
  );
}
