# Componentes — MultiMais Negócios

Todos os componentes usam exclusivamente tokens do design-tokens (DS 2.0): cores, Sora/Inter, espaçamento base 4px, sombras com base azul, raios 8–32px + squircle, motion 150/250/400ms com easing único `cubic-bezier(0.25,1,0.5,1)`.

---

## Header
**Função:** Logo, navegação, CTA principal sempre visível.
**Anatomia:** Logo · links de menu (`site.menu`) · botão CTA primário (`site.ctas.principal`)
**Variante:** fixo transparente que ganha fundo branco + `--shadow-2` ao rolar.
**Estados:** topo (transparente) · rolado (`--color-bg` + sombra) · menu aberto (painel mobile, foco preso) · sobre a Hero (`.overHero`, só na home antes de rolar — texto branco, ver `docs/sections/header.md`)
**Mobile:** altura ≤ 64px; logo + CTA compacto + hambúrguer; menu em painel/tela cheia.
**Microinteração (desde 2026-11-05):** links do menu desktop têm sublinhado animado (`scaleX`, `currentColor`) + destaque de fundo em pílula + leve "levantada" (`translateY(-1px)`) no hover/foco — cor do destaque é por estado (`--color-secondary-light` no padrão, branco translúcido no `.overHero`; laranja fixo falharia contraste num dos dois estados).
**Acessibilidade:** `<header>` + `<nav aria-label="Principal">`, link "Pular para o conteúdo" primeiro elemento focável, botão do menu com `aria-expanded`/`aria-controls`.
**Motion:** R13 (header reativo ao scroll), N1, CSS.
**Não fazer:** mais de 6 itens de menu; esconder o CTA ao rolar.

## Menu mobile
Painel lateral ou tela cheia, links ≥ 48px, CTA principal dentro do menu, fecha ao navegar/Esc, trava scroll do fundo. Motion R11, entrada ≤ 300ms.

## Footer
**Anatomia:** descrição curta · colunas de links · contatos · links legais (Privacidade/Termos) · copyright. Links legais sempre visíveis por ser financeira.

## Container / Section
Padroniza largura (1280px), padding lateral e `--space-section` vertical, com `id` de âncora por seção.

## Botão
**Formato (desde 2026-11-05):** pílula (`--radius-full`) nas 3 variantes.
**Variantes:** Primário (laranja, único CTA principal, ícone `IconWhatsAppBadge` — círculo preenchido + glifo branco, autocontido, na cor do texto — à esquerda, automático, não precisa passar prop) · Secundário (contorno azul) · Terciário (texto, sem fundo)
**Tamanhos:** md (44px) · lg (48px, Hero e CTA final)
**Estados:** padrão · hover (`brightness(1.1)` + "levanta" `translateY(-2px)` + `shadow-3`, nunca troca de cor) · active (`translateY(0) scale(0.97)`) · focus-visible (anel `--color-focus-ring` + borda `--color-focus-border`) · disabled · loading
**Regra:** rótulo é verbo + resultado ("Simular no WhatsApp"), nunca "Clique aqui". Primário aparece no máximo uma vez por dobra. Texto do primário continua na cor corrigida pro contraste AA (navy, não branco) — ver nota do T1.1/T1.13 em `docs/tasks.md`.

## CTA flutuante (WhatsApp) — mobile
Botão circular fixo no canto inferior direito, ícone WhatsApp, respeita safe-area, alvo ≥ 48px. Some quando o CTA do header já está visível na viewport (evita duplicar). Entra com fade curto (R1, CSS) depois do primeiro scroll.

## Card
Componente único com variantes de conteúdo:
| Variante | Usada em | Diferenças |
|---|---|---|
| diferencial | Diferenciais | ícone em container colorido (fundo laranja, ícone branco) + título + descrição |
| servico | Serviços | imagem 16:9 + título + descrição + seta de link, dentro de carrossel |

**Estados:** padrão (`--shadow-2`) · hover/foco (sobe 4px + `--shadow-3`, R10, CSS)
**Mobile:** largura total (diferencial) ou item de carrossel com scroll horizontal (serviço).

**Ilustração decorativa (2026-11-07, 2 rodadas no mesmo dia):** prop opcional `imagem` (variante `diferencial`) — PNG com fundo transparente, alinhado ao canto inferior direito do card (`position:absolute`, não conta pra altura do card), recortado pelos cantos arredondados se sobrar fora do card (`overflow:hidden` só entra quando o item tem imagem). Decorativa (`alt=""`), já que ícone+título+descrição sozinhos já descrevem o card.
- Os 4 itens de Diferenciais têm ilustração (1ª rodada: só "Análise rápida"; depois estendido pros outros 3).
- **Correção (2ª rodada, mesmo dia) — cliente pediu os cards do mesmo tamanho:** (1) `.card` ganhou `height:100%` — antes, mesmo a grade esticando o `<li>` pra altura da linha toda (`align-items:stretch`, padrão do CSS Grid), o card branco visível *dentro* do `<li>` não acompanhava, ficando do tamanho do próprio texto. (2) a ilustração passou a usar `next/image` com `fill` + `object-fit:contain` dentro de uma caixa de proporção fixa (`aspect-ratio:3/4`), em vez de `width`/`height` combinando com a proporção real de cada PNG — as 4 ilustrações não têm a mesma proporção (ex.: a de "Pagamento via PIX" é mais estreita/alta que as outras 3), então deixar cada uma na sua proporção real fazia ela parecer maior ou menor que as outras pra mesma largura. Os campos `imagem.width`/`imagem.height` (`Media`, `content.types.ts`) continuam no `content.json` como metadado (dimensão real do arquivo), mas não são mais lidos pelo componente desde essa correção.

*(variante `dor`, usada pela antiga seção Problema, removida em 2026-11-06 — a seção foi substituída por um carrossel próprio, `Vantagens`, ver `docs/sections/vantagens.md`)*
**Não fazer:** cartão clicável inteiro com mais de um destino.

## Passo numerado — "Como funciona"
**2026-11-07 — redesenhado:** antes era uma pilha vertical de 4 cards que escurecia progressivamente (branco → azul claro → laranja → navy); agora é uma lista minimalista (número + título + descrição, sem cartão/fundo colorido por passo) dentro de um único painel navy — a seção assumiu o lugar da antiga "Transforme seu limite" (Card 3D, removida; ver nota abaixo).
Número num círculo cheio (`--color-primary` fundo, `--color-primary-contrast` texto — mesmo par do CTA) + título + descrição em `--color-secondary-light` (texto claro sobre o navy do painel). Mobile: lista empilhada com linha divisória horizontal fina entre passos; desktop (≥768px): vira uma linha de 4 colunas com divisória vertical.
**Motion:** R2 (stagger), N1, Motion. Sem pin, sem scroll-jacking.
**Acessibilidade:** ordem lida segue 1→4; números como texto real.

*(A seção "Transforme seu limite" — Card 3D interativo, único ponto N3 do site, `src/components/Showcase3d/` — foi removida em 2026-11-07 a pedido do cliente. "Como funciona" assumiu seu lugar na página. Ver `docs/sections/showcase-3d.md` para o histórico do componente removido.)*

## Selo / Badge
Rótulo curto de reforço. Contraste AA, texto curto, nunca compete com o CTA.

## Mídia (imagem)
| Variante | Uso |
|---|---|
| padrão | imagens de seção (16:9, 4:3) |
| squircle | fotos de pessoas (CTA final) — `border-radius: 32% / 28%`, altura mínima 160px. *(Usado também em Sobre até 2026-11-07, quando a seção virou o marquee "Atendimento humanizado" — ver `docs/sections/sobre.md`.)* |
| panel | foto da Hero (exceção documentada, 2026-11-04 — ver `docs/sections/hero.md` item 10) — retângulo arredondado (`--radius-xl`) full-bleed, preenche a coluna/painel até a borda |
**Regras:** `alt` obrigatório, dimensões declaradas, lazy fora da 1ª dobra.

## Marquee foto+palavra (Sobre)
**2026-11-07, pedido do cliente, arquivo de referência completo:** 4 faixas horizontais full-bleed, cada uma um trilho infinito de "foto + palavra" que desliza sem parar (direções/velocidades alternadas), formando uma frase pela repetição. CSS puro (mesma receita de loop da Metricas), sem JS de animação.
**Anatomia:** faixa (`.row`, overflow:hidden) → trilho (`.track`, anima via `transform`) → item (foto quadrada + palavra), trilho = duas metades idênticas (loop sem costura)
**Acessibilidade:** faixas são `aria-hidden` (decorativas); leitor de tela recebe a frase real uma única vez via título/parágrafo visualmente ocultos antes das faixas
**Fotos:** `secoes.sobre.fotos` (pool de fotos reais, recebido 2026-11-07) é distribuído entre as ocorrências renderizadas do marquee — não há vínculo fixo entre uma palavra e uma foto específica, é puramente decorativo (`alt=""`); sem `fotos` no content.json, cada item cai no fallback de gradiente com cores da marca (`--c1`/`--c2`)
**Não fazer:** usar números/estatísticas não confirmados no texto do marquee (regra "não inventar conteúdo")

## Accordion (FAQ)
Duas colunas no desktop (CTA fixo à esquerda + lista à direita); empilha no mobile. Botão com `aria-expanded`, navegação por teclado, transição de altura controlada (nunca `auto` direto).

## Carrossel (Serviços)
Setas de navegação (desktop), gesto de arrasto (mobile), sem autoplay, indicação visual de "tem mais" no corte da última imagem. Setas com rótulo acessível, navegável por teclado.

## Botões de contato (Contato)
Grandes (≥ 48px), ícone + texto, mapa carregado sob demanda (ao tocar, não no load).

## Página 404
Título claro, texto humano, botão para início e para WhatsApp, mesmo header/footer do site.

## Banner de cookies
**Não aplicável neste projeto** — sem analytics/rastreadores, decisão do cliente.
