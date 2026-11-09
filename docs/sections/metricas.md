# Ficha — S02 Métricas

## 1. Identificação
- slug: metricas · Ordem: 2 (logo após o Hero, antes de Problema) · Nível: leve · Âncora: nenhuma (sem item no menu)

## 2. Função na narrativa
- Reforçar confiança logo na entrada, antes de qualquer objeção, com uma leitura rápida de escala ("não sou uma empresa pequena/arriscada").
- Papel: prova social numérica · não é um CTA, não compete com o CTA principal.

## 3. Conteúdo
- Chave: `secoes.metricas`
- Itens `validar`: **todos** — `itens[].valor`/`descricao` são placeholders ilustrativos (pedido explícito do cliente em 2026-11-05 pra preencher o slide enquanto não há números reais). Listado em `meta.pendencias_validar`.
- Sem mídia.

## 4. Layout
- Faixa horizontal estreita, fundo `--color-bg-alt` (mesmo tom do Problema), contínua ao Hero.
- Marquee (slide automático) infinito: itens em linha, rolando da direita pra esquerda, sem controles (não é carrossel navegável — é decorativo/informativo, não há conteúdo essencial único que dependa de interação).
- O que herdar: `Section` padrão (wrapper + `container`); tipografia dos valores reaproveita escala de número grande (mesma família de `--text-h2`/`--font-heading`).
- O que NÃO copiar: nada do carrossel de logos de parceiros descartado no Hero (ver `hero.md` item 10) — aqui o dado é explicitamente marcado como placeholder, não apresentado como prova de terceiros.

## 5. Componentes
- Novo componente: `src/components/Metricas/` (não reaproveita `Card`; é só valor + legenda, sem ícone/borda).

## 6. Jornada UX
- Vê: números passando em loop logo abaixo do Hero.
- Faz: nada (não é interativo).
- Sente: reforço rápido de "isso aqui é sério" antes de rolar pro Problema.
- Atrito → mitigação: nenhum — seção não bloqueia nem compete com o CTA.

## 7. Motion
- Nível: N1 · R_marquee (nova receita: translação horizontal contínua em loop, CSS puro — `transform` apenas)
- Desktop/mobile: mesma animação, `animation: marquee <duração> linear infinite`; duplica o grupo de itens (segundo grupo `aria-hidden`) pra looping sem costura via `translateX(-50%)`; velocidade igual nas duas telas (não depende de breakpoint, só a largura do viewport muda quanto do loop aparece de cada vez)
- Reduced-motion: animação removida (`animation: none`); itens passam a quebrar linha e ficam parados, lista visível por completo sem depender do loop
- Fallback: o grupo visível fica oculto de leitor de tela (`aria-hidden`) — os números reais ficam numa lista estática visualmente oculta (`sr-only`) logo antes, lida normalmente por teclado/AT; sem JS o CSS da animação já roda sozinho (não depende de JS pra existir)

**Correção (2026-11-07) — trilho ficava vazio em telas largas:** com só 4 itens, cada metade da trilha (`-50%` do loop) podia ser mais estreita que o viewport em monitores largos; nesse caso, no meio do loop, a janela visível avançava além do conteúdo disponível e mostrava um vão em branco até a próxima metade entrar. Corrigido repetindo os 4 itens 3× dentro de cada metade (`REPS = 3` em `Metricas.tsx`, mesma receita já usada em `Sobre.tsx`), garantindo largura suficiente pra qualquer viewport razoável. Pra não exibir os números repetidos no fallback estático (reduced-motion), as repetições extras ganham a classe `.itemExtra`, escondida só nesse modo — a view parada continua mostrando cada item uma única vez.

## 8. Mobile
- Mesma faixa, itens menores (`clamp()` no valor), loop mais compacto; sem alteração de interação.

## 9. Critérios de aceite
- (DoD padrão)
- Não force o uso de novas cores/sombras fora de `styles/design-tokens.css`
- Loop sem "pulo" visível (grupo duplicado com largura idêntica)
- Lista real (não duplicada) exposta a leitor de tela via texto visualmente oculto; grupo animado marcado `aria-hidden`
- `prefers-reduced-motion`: sem animação contínua

## 10. Notas e decisões
- **2026-11-05:** seção criada a pedido do cliente, inspirada numa referência visual de slide de métricas trazida por ele (template genérico de outro segmento — só o formato/motion foi aproveitado, não o conteúdo). Os números usados (`+500`, `R$ 2 milhões+`, `24h`, `+5 anos`) são **ilustrativos**, marcados `validar: true`; nenhum deles tem fonte no `dossie.md` (seção 4, "Prova social", registra ausência de avaliações/depoimentos e nenhuma métrica quantitativa confirmada). Trocar pelos números reais do cliente antes do lançamento — já listado em `meta.pendencias_validar`.
- Por ser decorativo/ilustrativo e sem fonte confirmada, esta seção **não entra** em dado estruturado (JSON-LD) nem em qualquer claim de SEO, mesmo padrão já usado para `site.contato.horarios` (ver `StructuredData.tsx`).

## 11. Status
completa (conteúdo placeholder — ver pendência de validação)
