# Ficha — S07 Como funciona

## 1. Identificação
- slug: como_funciona · Ordem: 6 (assumiu o lugar da antiga S08 "Transforme seu limite", removida) · Nível: completo · Âncora: #como-funciona

## 2. Função na narrativa
- Mostrar o processo em 4 passos simples, reduzindo o medo de burocracia.
- Papel: confiança · Relação com o CTA: CTA principal aparece ao final do processo.

## 3. Conteúdo
- Chave: `secoes.como_funciona`
- Itens `validar`: nenhum no texto (processo descritivo, não promessa de prazo específico)
- Mídia necessária: nenhuma (número + texto apenas)

## 4. Layout
- **2026-11-07 — redesenho, pedido do cliente:** a seção assumiu o lugar da antiga "Transforme seu limite" (Card 3D, removida — ver `docs/sections/showcase-3d.md`). Fundo azul da marca (`--color-secondary`, `background="dark"` do `Section`), mas a própria `<section>` agora é recuada das bordas da viewport e com cantos arredondados — um painel flutuante, não mais full-bleed (`margin-inline: var(--space-6)` ≈32px ≥600px, `var(--space-4)` 16px abaixo disso; `border-radius: var(--radius-xl)`)
- Estrutura: título+subtítulo centralizados, 4 passos minimalistas (número + título + descrição, sem cartão colorido por passo) empilhados no mobile e em linha no desktop, separados por uma linha fina translúcida; CTA centralizado abaixo
- Hierarquia: título > 4 passos > CTA
- Espaçamento: `--space-section` (padding vertical do `Section`)
- O que herdar: a numeração 1→4 como comunicação de avanço
- O que NÃO copiar: pin/scroll-jacking (não usado); os 4 cards com cor progressiva branco→azul→laranja→navy da versão anterior (substituídos por um único fundo navy minimalista)

## 5. Componentes
- Passo numerado (número + título + descrição), Botão/primário (ver `docs/componentes.md`)

## 6. Jornada UX
- Vê: painel navy com 4 passos numerados
- Faz: rola / lê
- Reage: cada passo revela ao entrar na viewport (stagger)
- Sente: "não é complicado, são só 4 passos"
- Atrito → mitigação: gente com pressa pode pular a leitura → numeração grande + títulos curtos dão o essencial de relance
- Evento: `cta_principal_click` (origem: como_funciona)

## 7. Motion
- Nível: N1 · Biblioteca: Motion
- Elementos: passos — R2 (stagger)
- Desktop: 4 passos revelam em sequência (stagger 80ms), leve subida
- Mobile: mesma lista, stagger mais curto
- Reduced-motion: os 4 passos aparecem direto, sem deslocamento

## 8. Mobile
- Lista empilhada (1 coluna), separador horizontal fino entre passos; vira linha (4 colunas, separador vertical) a partir de 768px

## 9. Critérios de aceite
- (DoD padrão)
- Ordem lida pelo leitor de tela segue a ordem visual (1→4)
- Texto do painel navy (título, subtítulo, descrição dos passos) passa contraste AA sobre `--color-secondary`

## 10. Notas e decisões
- **2026-11-07:** seção redesenhada e reposicionada a pedido explícito do cliente, no mesmo movimento em que a seção "Transforme seu limite" (Card 3D) foi removida do site — ver `docs/sections/showcase-3d.md` para o histórico da seção removida.

## 11. Status
completa
