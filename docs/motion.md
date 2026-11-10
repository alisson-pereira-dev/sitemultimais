# Motion — MultiMais Negócios

## Nível geral
N1 em quase todo o site. N2 (parallax leve) no Hero. **Sem N3** — a seção S08 (card 3D interativo) foi removida em 2026-11-07 a pedido do cliente; ver `docs/sections/showcase-3d.md`.
Biblioteca por elemento: CSS (padrão) → Motion/React (reveals com stagger) → GSAP ScrollTrigger (parallax, só no Hero).

Tokens usados (`styles/design-tokens.css`): `--dur-fast` 150ms · `--dur-base` 250ms · `--dur-slow` 400ms · `--ease-standard` cubic-bezier(0.25,1,0.5,1) (única easing) · `--stagger-step` 60ms · `--reveal-distance` 16px.

---

## S00 Header
- Nível: N1 · R13 (fundo/sombra ao rolar, CSS) + R11 (painel mobile, Motion)
- Desktop: fundo transparente → `--color-bg` + `--shadow-2` depois de ~80px de scroll, `--dur-fast`
- Mobile: mesmo comportamento; painel do menu entra ≤ 300ms, foco no primeiro link
- Reduced-motion: mudança de fundo instantânea; painel sem transição de posição
- Fallback JS: header e menu funcionam sem o efeito de fundo

## S01 Hero
- Nível: N1 (texto/CTA, R1) + N2 (parallax de fundo, R4, GSAP ScrollTrigger) + N2 (sobreposição com S03, ver abaixo)
- Desktop: stagger de 80ms entre headline → subheadline → CTA (`--dur-slow`); fundo desloca ≤10% da altura ao rolar (só `transform`)
- Mobile: mesma sequência de texto, mais curta; **2026-11-10: parallax de fundo reativado** (decisão anterior que desligava só nessa largura foi revertida a pedido do cliente) — mesmo ≤10%, só `transform`, `will-change` aplicado só enquanto a ScrollTrigger está viva. A sobreposição Hero→Métricas→Vantagens (abaixo) continua desktop-only, não foi incluída nessa reativação.
- Reduced-motion: tudo aparece direto, sem deslocamento; parallax desligado
- Cuidado: imagem de fundo não é a imagem de prioridade de LCP; parallax não aplica na imagem crítica
- Fallback JS: headline, subheadline e CTA já estão no HTML visíveis por padrão
- **2026-11-05 — sobreposição Hero → Métricas → Vantagens (pedido do cliente):** entre o Hero e S03 Vantagens (seção "Problema" original, trocada por um carrossel em 2026-11-06 — ver nota na S03), o painel do Hero acompanha o scroll **mais devagar** que a página (GSAP ScrollTrigger scrub em `.panel`, `useHeroParallax.ts`, `y` positivo crescendo com o scroll até 35% da altura do Hero) enquanto Métricas (S02) e Vantagens sobem no ritmo normal — é esse descompasso de velocidade (Hero "atrasado" sendo alcançado) que lê como paralax, cobrindo o Hero aos poucos em vez de um corte seco.
  - `position: relative` + `z-index` crescente em Hero/Métricas/Vantagens (1/2/3) garantem que quem vem depois pinte por cima quando as duas coisas se sobrepuserem na tela — necessário porque um elemento com `transform` (o Hero, animado via GSAP) sempre cria seu próprio contexto de empilhamento, mesmo sem `position:sticky`, e pintaria por cima de irmãos estáticos sem isso.
  - Duas ScrollTrigger no mesmo elemento (`trigger: hero`) coexistindo sem conflito: o blob de fundo (`start: top top` / `end: bottom top`) e este atraso do painel (`start: top top` / `endTrigger: #vantagens, end: top top`) — faixas de scroll diferentes, GSAP recalcula cada uma de forma independente.
  - **Tentativas descartadas no mesmo dia:** (1) `position: sticky` (Hero travado 100% fixo) — o cliente apontou que não parecia paralax, só um congelamento; (2) painel encolhendo/escurecendo (`scale`/`opacity`) no lugar do atraso de velocidade — também não era o efeito pedido. Versão atual: atraso de velocidade via `y`, conforme descrito pelo cliente ("a Hero acompanha até determinado momento e é sobreposta").
  - Só desktop (≥1024px) e `prefers-reduced-motion: no-preference`; fora disso as 3 seções ficam simplesmente empilhadas (comportamento padrão, sem sobreposição, sem JS). Exceção pontual ao escopo original do N2 (que era só o blob de fundo do próprio Hero) — não se espalha pra mais nenhuma seção depois de Vantagens.

## S02 Métricas
- Nível: N1 · R_marquee (nova receita: loop horizontal contínuo, CSS puro, só `transform`)
- Desktop/mobile: `animation: marquee <dur> linear infinite`; grupo de itens duplicado uma vez (cópia `aria-hidden`) pra loop sem costura; mesma velocidade nas duas telas
- Reduced-motion: `animation: none` — itens quebram linha e ficam parados, nada rola continuamente
- Fallback JS: é CSS puro, roda sem JS; números reais também existem como texto visualmente oculto (não duplicado) pra leitor de tela, fora do grupo `aria-hidden`

## S03 Vantagens (substituiu "Problema" em 2026-11-06, pedido do cliente)
- Nível: N1 · fila giratória + N2 (sobe por cima do Hero/Métricas ao rolar — ver nota em S01)
- **Exceção deliberada às 10 regras de `09-MOTION` (só nesta seção, pedida explicitamente pelo cliente via documento de direcionamento formal, 2026-11-06):** anima `left`/`width` em CSS puro (`transition: left .5s cubic-bezier(.4,0,.2,1), width .5s cubic-bezier(.4,0,.2,1)`), não `transform`/`opacity`. Cada card é `position:absolute`; `pos[i]` (0 = destaque) define `left`/`width`, calculados em JS a partir da largura do viewport — card em destaque ocupa o espaço restante depois dos recolhidos (breakpoint 700px, recolhido 207/253px, 2/3 cards visíveis — valores literais do arquivo de referência, não tokens).
- Setas/clique num card recolhido/swipe (>40px) giram a fila (`pos` desloca módulo N) — looping contínuo, nunca desabilita (só 3 itens fixos). Card em destaque ganha `z-index:1` durante a troca — visivelmente passa por cima dos outros, não só redimensiona lado a lado.
- Mobile (<700px): 2 cards visíveis (1 em destaque + 1 espiando a próxima), swipe troca o destaque; setas escondidas
- Reduced-motion: `transition:none` — troca salta direto pro tamanho final
- Fallback sem JS/antes da 1ª medição: os 3 cards ficam empilhados em fluxo normal (sem `position:absolute`) — conteúdo 100% visível sem precisar de JS
- 1º layout e resize não animam: `transition:none` aplicado antes de recalcular, religado depois de 2 `requestAnimationFrame` (mesma técnica do arquivo de referência) — só a troca por interação do usuário anima
- **Por que a exceção:** uma rodada anterior usava o `layout` do Motion (FLIP via `transform: scale()`) pra ficar dentro da regra "anima só transform/opacity" — mas como a largura muda muito mais que a altura, a escala não-uniforme distorcia a foto durante a troca. `left`/`width` em CSS puro não tem esse problema (o navegador recalcula `object-fit:cover` a cada frame, não estica uma imagem já renderizada) — e foi a técnica que o cliente pediu explicitamente, documento em mãos. Não é pra replicar essa exceção em outras seções.
- Histórico completo (5 rodadas no mesmo dia até bater com o que o cliente queria): `docs/sections/vantagens.md` (item 10)

## S03B Reveal (nova seção, 2026-11-07, pedido do cliente)
- Nível: **exceção pontual de motion** — efeito "cortina" (fundo `position:fixed` revelado/coberto pelas seções vizinhas via `clip-path`) + título com deriva vertical (~64px, tabela de 11 pontos medidos, não-linear). Não é nenhuma das 10 receitas padrão de `09-MOTION`; pedida explicitamente pelo cliente com arquivo de referência completo.
- **2026-11-10: roda em qualquer largura** (mesma técnica do desktop — cliente pediu explicitamente pra não trocar por outra) + motion permitido: `.reveal{clip-path:inset(0)}` recorta o `.pinned{position:fixed}` filho pra só aparecer dentro da caixa da seção — a seção anterior (Vantagens) sobe e revela, a seguinte (Diferenciais) sobe e cobre. Título (`.titleShift`) só anima `transform: translate(-50%, ty)`, `ty` recalculado a cada frame de scroll (`requestAnimationFrame` + listener `{passive:true}`) a partir de `getBoundingClientRect().top` da seção — mesma conta em qualquer largura. O único valor que continua desktop-only (`min-width:1024px`) é o `font-size:100px` literal do título.
- Reduced-motion (qualquer largura): a seção cai pra um bloco normal (degradê laranja, título centralizado, sem `position:fixed`, sem deriva).
- **Histórico da reativação mobile, 2026-11-10 (3 rodadas no mesmo dia):**
  1. 1ª tentativa: removido o gate `min-width:1024px`, sem mais nada. O site publicado passou a ter um desalinhamento intermitente numa seção bem mais abaixo ("Como funciona"), em celular real e simulado. Reproduzi em WebKit (motor do Safari/iPhone, via Playwright com scroll rápido) um lag real de repintura — `clip-path` num ancestral + `position:fixed` descendente é caro de repintar, e rodar isso numa página de scroll inteira no mobile (em vez de contido numa única viewport-height, como no desktop) foi o gatilho. Revertido pra desktop-only.
  2. 2ª tentativa: troquei a técnica inteira por "seções-irmãs com `position:sticky` + z-index crescente" (mesma receita de Dúvidas→Fale com a gente→CTA final). Funcionava e passava no teste de WebKit, mas o cliente preferiu a sensação visual original (a "janela" fixa revelando um fundo parado é diferente de um card que desliza e gruda) — revertida.
  3. **Versão atual:** mesma técnica do desktop (`fixed`+`clip-path`) de volta, com `contain: paint` em `.reveal` (isola o repaint caro desta seção do resto da página — provavelmente a causa real do vazamento visto na 1ª tentativa) e `transform: translateZ(0)` em `.pinned` (força camada de composição própria, reforço extra). Retestado em WebKit com o mesmo scroll rápido programático da 1ª tentativa — sem anomalias dessa vez.
- **Cor de fundo e do título (2026-11-07):** o cliente pediu fundo em degradê laranja (`linear-gradient(135deg, var(--color-primary), var(--color-primary-soft))`, mesmo degradê já usado no CTA) em vez do navy que eu tinha usado antes, e título branco. **Ressalva não resolvida sozinho:** branco sobre esse laranja é ~2,85:1, abaixo até do mínimo AA pra texto grande (3:1) — o mesmo problema já tinha sido resolvido com `--color-primary-contrast` (navy) no CTA principal e eu tinha aplicado a mesma solução aqui antes; o cliente pediu branco mesmo assim depois de ver a versão navy, então troquei, mas a falha de contraste não foi corrigida — sinalizando em vez de decidir sozinho de novo.
- Reduced-motion (mesmo em desktop): título parado em `REST = -44.14px` (valor de repouso medido, u=0), nunca se desloca.
- Fallback sem JS: o efeito central (pin + cortina) é CSS puro — funciona sem nenhuma linha de JS em telas ≥1024px, já que a media query não depende de JS. Só a deriva do título precisa de JS; sem ele, o título fica parado no `transform` padrão do CSS.
- Cuidado (do próprio arquivo de referência): nenhum ancestral de `.pinned` pode ter `transform`/`filter`/`will-change:transform` — qualquer um desses quebra o `position:fixed` (vira relativo a esse ancestral em vez da viewport).
- Detalhe completo: `docs/sections/reveal.md`

## S05 Diferenciais
- Nível: N1 · R2 (stagger, Motion)
- Desktop: stagger de 60ms, 4 itens. Mobile: mesmo, 1 coluna. Reduced: aparecem juntos.

## S06 Serviços
- Nível: N1 (modo simples/fallback) · R2 (entrada, Motion) + R10 (hover/tap, CSS)
- Desktop: cards revelam com stagger; hover eleva (`--shadow-3`, sobe 4px)
- Mobile: sem hover — toque dá `scale(0.98)`; arrasto nativo (scroll-snap)
- Reduced-motion: cards aparecem sem deslocamento; arrasto continua (é interação do usuário, não decoração)
- **Modo "creative" (2026-11-07, pedido do cliente, arquivo de referência completo):** exceção pontual de motion — carrossel Swiper real (lib `swiper`, não reimplementado à mão), `effect:'creative'` (cards recuam em profundidade 3D ao trocar, não deslizam). Só monta ≥1100px + `prefers-reduced-motion:no-preference` + JS; fora disso o modo simples acima é tudo que existe. Parâmetros do Swiper (`speed:850`, `creativeEffect.prev/next` com `translateZ(-400px)` etc.) copiados literalmente do arquivo de referência. Upgrade pra Swiper v14 em vez da v11 do arquivo — v11 tem vulnerabilidade crítica conhecida (prototype pollution); v14 mantém a mesma API. Detalhe completo: `docs/sections/servicos.md`.

## S08 Transforme seu limite — Card 3D interativo (REMOVIDA em 2026-11-07)
~~Nível: N3 · R3F/Three.js~~ — seção removida a pedido do cliente. Ver `docs/sections/showcase-3d.md` para o histórico.

## S07 Como funciona
- Nível: N1 · R2 (stagger, Motion)
- **2026-11-07:** redesenhada e reposicionada (assumiu o lugar de S08, removida) — fundo navy (`--color-secondary`), painel recuado da viewport com cantos arredondados, 4 passos minimalistas (número + título + descrição, sem cartão colorido por passo)
- Desktop: 4 passos revelam em sequência (stagger 80ms), leve subida
- Mobile: mesma lista, stagger mais curto
- Reduced-motion: os 4 passos aparecem direto, sem deslocamento

## S04 Sobre
- **2026-11-07 — redesenho completo, pedido do cliente, arquivo de referência completo:** marquee de 4 faixas (foto+palavra rolando sem parar), substituindo o layout anterior (reveal de texto+foto, Motion)
- Nível: N1 · R_marquee (mesma receita de S02 Métricas — loop horizontal contínuo, CSS puro, só `transform`), mas com 4 faixas simultâneas em vez de uma, direções/velocidades alternadas
- Desktop/mobile: `animation: ... linear infinite` por faixa, `animation-delay` negativo por faixa (começa "no meio"); duas metades idênticas por trilho (loop sem costura); valores de duração/atraso literais do arquivo de referência (84s/240s/156s/240s · -29.4s/0s/-109.2s/-48s), não alterados
- Reduced-motion: trilho para num quadro fixo (`translate3d(-17.5%,0,0)`, valor do arquivo); frase real continua acessível por leitor de tela via título/parágrafo ocultos visualmente
- Fallback JS: CSS puro, roda sem JS
- Detalhe completo: `docs/sections/sobre.md`

## S16 FAQ
- Nível: N1 · R17 (accordion, CSS/primitivo acessível)
- Abertura por transição de altura controlada (`grid-template-rows` ou equivalente), `--dur-base`
- Reduced-motion: abre/fecha instantâneo
- Cuidado: nunca estourar layout durante a transição

## S17 Contato
- Nível: N0–N1 · R10 (hover/tap, CSS). Mapa fica visível direto (sem clique — pedido do cliente em 2026-11-09), `loading="lazy"` nativo do iframe evita custo no load crítico.

## S19 CTA final
- Nível: N1 · R10 (botão, CSS) + R1 leve opcional (container, Motion). Reveal simples ao entrar na viewport.

## Sobreposição Dúvidas → Fale com a gente → Vamos resolver isso agora? (2026-11-09, pedido do cliente)
- Mesmo princípio da sobreposição Hero→Métricas→Vantagens (ver nota em S01), mas via técnica diferente: FAQ, Contato e CTA final ficam dentro de um wrapper comum (`page.module.css`, `.stack`); FAQ e Contato recebem `position: sticky; top: 0` com `z-index` crescente (1/2/3) — cada seção fica presa no topo até a seguinte (opaca, por cima) subir e cobri-la.
- Só desktop (≥1024px) e `prefers-reduced-motion: no-preference`; fora disso as 3 seções ficam simplesmente empilhadas (comportamento padrão, sem sobreposição) — mesmo critério do S01.
- CSS puro (`position`/`z-index`, sem `transform` custeando a troca) — não é scroll-jacking: o scroll continua nativo, só a pilha de camadas muda com a posição de rolagem.
- Fallback JS: nenhum — funciona sem JS (diferente do S01, que depende de GSAP).

## CTA flutuante (WhatsApp)
- Nível: N1 · R1 (fade, CSS). Mobile: aparece com fade curto depois do primeiro scroll; some quando o CTA do header está visível. Reduced-motion: troca de visibilidade direta, sem fade.

## S23 Footer
- Nível: N0 — sem animação de entrada.

---

## Checagem por seção (09-MOTION, seção 6)
- [~] Nível declarado e dentro do teto mobile — **exceções documentadas, todas a pedido explícito do cliente:** sobreposição Hero→Métricas→Vantagens (N2 estendido, ver S01); S03 Vantagens (técnica `left`/`width`, ver S03); S03B Reveal (efeito "cortina" próprio, fora das 10 receitas padrão, ver S03B) — nenhuma se espalha pras demais seções; site não tem mais nenhum ponto N3 desde a remoção de S08 (2026-11-07)
- [x] 3 versões definidas (desktop/mobile/reduced) em todas as seções com motion
- [~] Apenas `transform`/`opacity` em todas as receitas usadas (R1, R2, R4, R10, R11, R13, R17) — **exceção documentada:** S03 Vantagens anima `left`/`width` (CSS puro), a pedido explícito do cliente e pra evitar um bug de distorção de imagem; ver nota em S03
- [x] Nada depende de hover (carrossel e cards têm equivalente de toque/teclado)
- [x] Uma biblioteca por elemento (CSS, Motion ou GSAP — nunca duas no mesmo elemento)
- [x] Conteúdo legível sem JS (headline, CTA, cards já estão no HTML antes da animação)
- [x] Sem CLS ao animar (altura do accordion controlada; mapa reserva espaço)
- [x] Um destaque por tela (Hero = texto+CTA+parallax)
