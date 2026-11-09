# Ficha — S04 Sobre

## 1. Identificação
- slug: sobre · Ordem: 7 · Nível: completo · Âncora: #sobre

## 2. Função na narrativa
- Humanizar a marca: mostrar que existe uma empresa real e local por trás do atendimento.
- Papel: confiança.

## 3. Conteúdo
- Chave: `secoes.sobre`
- Itens `validar`: a frase do marquee ("Atendimento humanizado de pessoa pra pessoa.") — formulação provisória, não confirmada pelo cliente como texto final de marca
- Mídia: `secoes.sobre.fotos` — pool de 5 fotos reais recebidas em 2026-11-07 (`public/images/atendimento_human_01.jpg` a `_05.jpg`), distribuídas entre as ocorrências renderizadas do marquee (não há 1 foto fixa por palavra — cada faixa começa num ponto diferente do pool pra dar variedade). Sem `fotos` no content.json, cada item cai no fallback: gradiente com cores da marca.

## 4. Layout
- **2026-11-07 — redesenho completo, pedido do cliente, arquivo de referência HTML/CSS/JS completo** (mesmo padrão de fidelidade literal já usado em Vantagens/Reveal/Serviços): "para a seção abaixo... pode fazer dessa forma" (marquee "130 milhões" da Nu). Substituiu por inteiro o layout anterior (foto squircle + título + parágrafo).
- Estrutura: 4 faixas horizontais empilhadas, full-bleed (sangram até a borda da janela, `width:100vw` + margem negativa, cortado por `overflow-x:hidden` na seção); cada faixa é um trilho infinito de "foto + palavra" que desliza sem parar, alternando direção (← → ← →) e velocidade
- Hierarquia visual: não há título/parágrafo visíveis — a frase "Atendimento humanizado de pessoa pra pessoa." é formada pela sequência das 4 palavras/expressões repetidas em cada faixa
- Espaçamento: `--space-section` (padding vertical do `Section`, como as demais seções)
- Fundo: `--color-bg-alt` (mantido do layout anterior)
- O que herdar: a estrutura exata do arquivo (4 faixas, duas metades idênticas por trilho pra loop sem costura, REPS=3, direções/velocidades/atrasos literais)
- O que NÃO copiar / adaptações documentadas:
  - Cor do texto: `var(--color-secondary)` (navy da marca) no lugar do roxo `#8D0DE3` (de outra marca)
  - Fonte: `var(--font-heading)` (Sora) no lugar de `nuSansDisplay` (fonte licenciada, não disponível)
  - Fotos: pool real (`secoes.sobre.fotos`) distribuído entre ocorrências; sem pool, gradiente com tokens da marca (`--color-secondary`/`--color-primary` e variações) no lugar de hex soltos
  - Espaçamentos (8/16/24px do arquivo) mapeados direto pros tokens do projeto (`--space-2`/`--space-4`/`--space-5`), sem precisar de exceção — já batem exatamente
  - Grid de 12 colunas do arquivo simplificado (cada faixa já ocupa as 12 colunas sempre — resultado visual idêntico)
  - Demais valores (durações 84s/240s/156s/240s, atrasos -29.4s/0s/-109.2s/-48s, letter-spacing -3.4px, alturas 100px/160px, tamanhos de foto, fórmulas de `clamp` por breakpoint) são literais do arquivo, copiados sem alteração

## 5. Componentes
- Nenhum componente compartilhado — markup próprio dentro de `Sobre.tsx` (mesma razão do modo "creative" de Serviços: estrutura HTML literal exigida pela técnica, não reaproveita `Card`/`Mídia`)

## 6. Jornada UX
- Vê: 4 faixas de foto+texto rolando sem parar, formando a frase "Atendimento humanizado de pessoa pra pessoa."
- Faz: rola a página (a faixa não depende de interação, é decorativa)
- Reage: sensação de movimento constante, marca repetida visualmente
- Sente: "tem gente de verdade por trás disso, atendimento é o nome do jogo"
- Atrito → mitigação: as faixas (foto + texto repetidos) são decorativas → leitor de tela recebe a frase real uma única vez (`<h2>`/`<p>` visualmente ocultos), as faixas são `aria-hidden`
- Evento: nenhum

## 7. Motion
- Nível: N1 · Biblioteca: CSS puro (mesma receita "R_marquee" já usada em S02 Métricas — loop horizontal contínuo, só `transform`)
- Desktop/mobile: `animation: <nome> <dur> linear infinite` por faixa, com `animation-delay` negativo (faixa já começa "no meio"); cada trilho é duas metades idênticas (`translate3d` 0 ↔ -50%) pra loop sem costura
- Reduced-motion: animação desligada, trilho parado num quadro fixo (`translate3d(-17.5%,0,0)`) — valor do arquivo de referência, mantido; o conteúdo real (frase) continua disponível pro leitor de tela via `<h2>`/`<p>` ocultos visualmente, independente do motion
- Fallback JS: é CSS puro, roda sem JS

## 8. Mobile
- Mesmas 4 faixas, só menores (altura/foto 100px, fonte 64px — vs. 160px/156px no desktop, `clamp` entre os dois)

## 9. Critérios de aceite
- (DoD padrão)
- Frase real acessível por leitor de tela (não só a versão decorativa/repetida)
- Sem overflow horizontal na página inteira, mesmo com o marquee sangrando até a borda da janela (`overflow-x:hidden` na seção contém o breakout)
- Texto/frase marcados como não confirmados pelo cliente (`validar`) até aprovação

## 10. Notas e decisões
- **2026-11-07:** layout anterior (foto squircle + título "Quem é a MultiMais" + parágrafo institucional) descartado por inteiro a pedido do cliente. Frase do marquee é uma formulação provisória minha — sem inventar números (as métricas atuais, `+500`/`R$2mi+`, seguem marcadas `validar` e não foram usadas aqui) — reaproveitando linguagem já aprovada em outros pontos do site (`hero.destaque`: "Atendimento humanizado em Muritiba, BA"). Precisa de validação do cliente antes do lançamento.
- **2026-11-07 (mesmo dia, depois):** 5 fotos reais recebidas (`atendimento_human_01.jpg` a `_05.jpg`). Decisão: não fixar 1 foto por palavra (o vínculo palavra↔foto não faz sentido semântico, já que as faixas são puramente decorativas) — o pool de fotos é distribuído entre as ocorrências renderizadas do marquee, com cada faixa começando num ponto diferente do pool, dando variedade visual (mais fiel ao arquivo de referência original, que mostra fotos variadas, não a mesma foto repetida). `img` continua com `alt=""` (decorativo — a frase real já é exposta ao leitor de tela via `<h2>`/`<p>` ocultos).
- **2026-11-07 (mesmo dia, pedido do cliente):** a palavra "humanizado" ganhou destaque em laranja (`--color-primary`) em vez da cor navy padrão do texto — flag `destaque: true` em `secoes.sobre.itens[1]` (content-driven, não hardcoded no componente), nova classe `.destaque` em `Sobre.module.css`.

## 11. Status
completa — frase pendente de validação do cliente (`validar: true`); fotos recebidas e em uso
