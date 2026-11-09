# Ficha — S03 Vantagens

## 1. Identificação
- slug: vantagens · Ordem: 2 (logo após Métricas, no lugar onde era a seção Problema) · Nível: completo · Âncora: #vantagens

## 2. Função na narrativa
- Mostrar, em formato de carrossel (fila giratória de 3 cards), as dores reais que a MultiMais resolve, antes de apresentar os serviços — lógica PAS (Problema-Agitação-Solução), igual à antiga seção Problema.
- Papel: interesse. **Substituiu visualmente a seção Problema** (3 dores) em 2026-11-06 — ver nota em `docs/sections/problema.md`. **2026-11-07: o conteúdo (copy) voltou a ser o mesmo da antiga Problema** — ver item 3 — depois que o cliente apontou que a copy certa pra esta seção era a original (dores reais, extraídas dos posts do Instagram), não os 3 textos que eu tinha inventado pro formato carrossel ("Fácil, rápido e sem burocracia" etc.). O subtítulo ("A gente sabe como é") é o original da antiga Problema, fixo.
- **2026-11-07:** o título grande que a seção tinha ("A vida não espera o dinheiro aparecer") migrou pra uma nova seção própria, S03B Reveal, a pedido do cliente — ver `docs/sections/reveal.md`. Vantagens ficou só com a etiqueta pequena acima do carrossel (perguntei se ele queria repetir a frase nas duas seções ou tirar daqui; escolheu tirar).

## 3. Conteúdo
- Chave: `secoes.vantagens` — `subtitulo` (etiqueta) + `destaque` (título H2 em degradê) + `slides[]` (titulo, legenda, icone, midia) + `transicao` (linha de fechamento) + `cta`
- **2026-11-07:** `destaque` ("Uma conta que chega de surpresa") adicionado como H2 em degradê laranja (referência visual do cliente), logo abaixo da etiqueta "A gente sabe como é" — ver item 4 pra detalhe de estilo e a ressalva de contraste. `subtitulo` voltou a ser `<span>` (não-heading), já que agora `destaque` é o único H2 da seção
- **2026-11-07:** conteúdo dos slides trocado pelas 3 dores reais da antiga seção Problema (extraídas dos posts do Instagram, não inventadas — ver `docs/dossie.md`): "Imprevisto financeiro", "Aperto no cartão", "Falta de planejamento". `legenda` de cada slide agora é a descrição completa de cada dor (não um rótulo curto) — como só é usada como texto oculto/acessível do selo de ícone (nunca aparece visualmente), o tamanho não importa, e usar a frase real é melhor que inventar um rótulo curto
- `transicao` ("É pra isso que a MultiMais existe.") é a mesma linha de fechamento que a antiga Problema já tinha — volta como fechamento dos 3 cards de dor, antes do CTA
- Itens `validar`: nenhum — texto real, já confirmado como fonte (posts do Instagram da própria marca)
- Mídia: 3 fotos reais fornecidas pelo cliente em 2026-11-06. **2026-11-07: remapeadas** pra combinar melhor com as dores reais (antes combinavam mal com a copy inventada): senhora com conta em casa → "Imprevisto financeiro"; senhora pagando com cartão → "Aperto no cartão" (o cartão aparece literalmente na foto); senhor com calculadora/papéis → "Falta de planejamento"

## 4. Layout e implementação (fiel ao arquivo de referência do cliente — ver item 10)
- **Fonte da verdade desta seção:** HTML/CSS/JS completo enviado pelo "dono do slider" em 2026-11-06, com a instrução explícita de copiar estrutura DOM/CSS/JS ao pé da letra. A ficha abaixo reflete esse arquivo, não decisões minhas.
- DOM: `.viewport` (relative, overflow hidden, 500px) → `.slide` ×3 (absolute, `left`/`width` calculados em JS) → `.card` (`<button>`, não `<article>` — ver exceção) → `.cardInner` (padding 10px, radius 40px*, overflow hidden, `::after` = gradiente de leitura) → foto + título (`.cardTitulo`) + selo (`.chip`)
- Card: borda 1px `#CBC9C8` (cinza literal, não token), radius 24px, fundo `--color-surface`; foto com radius 18px (`SquircleMedia` shape `"card"`), respiro de 10px entre borda e foto (padding do `.cardInner`)
- Card em destaque (posição 0 da fila): mais largo, `z-index:1` (passa visivelmente por cima dos outros durante a troca), gradiente de leitura + título aparecem (opacity 0→1)
- Cards recolhidos: mais estreitos, só o selo circular (ícone branco 22px, círculo laranja `--color-primary` 44px, cresce pra 48px no hover) — sem texto visível
- Setas: círculo branco 48px, borda cinza `#CBC9C8`, vira borda/fundo laranja (`--color-primary`/`--color-primary-light`) no hover; giram a fila, looping contínuo, nunca desabilitadas
- CTA: `Button` padrão do site (pílula laranja) — não o botão retangular do arquivo (ver exceção)
- **Cabeçalho (2026-11-07, 3 rodadas no mesmo dia):**
  1. Etiqueta "A gente sabe como é" (`<span>`) + título `destaque` em degradê laranja, com a técnica corrigida a partir de um arquivo de referência do cliente: o degradê vai num `<span>` **inline** dentro do heading (nunca aplicado direto no elemento de bloco nem num span `inline-block`) — um gradiente horizontal direto num bloco se repete igual em cada linha quebrada; só um inline de verdade, com o `box-decoration-break:slice` padrão do navegador, trata as linhas quebradas como fatias de uma caixa só, e o degradê continua de uma linha pra outra em vez de repetir.
  2. A etiqueta "A gente sabe como é" virou `<h1>` (era `<span>`) — mantida no mesmo tamanho pequeno de antes, só a tag mudou. **Isso faz a página ter 2 `<h1>` (o outro é o headline do Hero)** — atípico do padrão "um h1 só", mas válido em HTML5 e não é uma regra obrigatória de AA/WCAG; pedido explícito, não revertido sozinho. O título `destaque` ganhou quebra de linha manual ("Uma conta" / "que chega de surpresa") — o texto no `content.json` tem um `\n` literal, convertido em `<br/>` real no componente (não CSS), mantendo o degradê contínuo através da quebra.
  3. **Correção seguinte, mesmo dia:** a etiqueta (`<h1>`) e o título `destaque` (`<h2>`) ganharam degradês **diferentes** — a etiqueta em azul (`.gradientBlue`), o título em laranja (`.gradientOrange`), antes os dois compartilhavam o mesmo laranja. E `destaque` virou peso "light" (`font-weight:300`) — precisou carregar o peso 300 do Sora em `layout.tsx` (só 600/700/800 estavam carregados; sem o peso real, o navegador cai pro mais próximo disponível e não fica "light" de verdade).
  - Degradê laranja (`destaque`): `--color-primary-soft` → `--color-primary` (mesmo par já usado no CTA principal e no fundo da Reveal). Degradê azul (etiqueta): `--color-secondary-medium` → `--color-secondary` (mesmo azul de títulos/navbar/footer no resto do site). Os dois com a cor inicial sólida até 25% da largura antes de transicionar — mesma proporção da referência do cliente (lá era amarelo→vermelho; aqui são as cores da marca).
  - **Ressalva de contraste — só no laranja, não no azul:** no `destaque` (texto grande, `--text-h2`, mínimo AA 3:1) o degradê laranja fica abaixo disso perto do início (`--color-primary-soft`). Mesma situação já aceita pelo cliente no título da Reveal (branco sobre laranja); segui a mesma lógica aqui, mas fica registrado. **O degradê azul da etiqueta não tem esse problema** — `--color-secondary-medium`/`--color-secondary` são escuros o bastante pra passar AA folgado (~10:1+) contra o fundo branco, mesmo sendo texto pequeno (que exige 4,5:1, o critério mais rígido).

## 5. Componentes
- `SquircleMedia` ganhou a shape `"card"` — radius 18px literal (não token), sem sombra própria; usada só aqui, dentro de `.cardInner`

## 6. Jornada UX
- Vê: 3 cards numa fila (1 em destaque, mais largo, com título); os outros mostram só um selo de ícone
- Faz: clica numa seta, ou diretamente num card recolhido, ou arrasta (swipe, qualquer tela) pra trocar quem fica em destaque
- Reage: card em destaque escurece a base da foto e revela o título; o selo do card recolhido some; a fila inteira reorganiza largura/posição com animação suave, o destaque passando visivelmente por cima dos outros
- Sente: "fácil, seguro, tudo num lugar só"
- Atrito → mitigação: setas sem fim/looping (só 3 itens) podem parecer "sem função clara" → giram o destaque continuamente, sempre com a mesma aparência (nunca "desabilitadas")
- Evento: não instrumentado agora

## 7. Motion
- Nível: N1 · fila giratória (`left`/`width` em CSS puro, **não** `transform`/Motion `layout` — exceção deliberada às 10 regras de `09-MOTION`, pedida explicitamente pelo cliente; ver item 10) + N2 herdado do Hero (ver `docs/motion.md` S01)
- Transição: `left .5s cubic-bezier(.4,0,.2,1), width .5s cubic-bezier(.4,0,.2,1)` — literal do arquivo, não `--ease-standard`/`--dur-*`
- Desktop (≥700px): 3 cards visíveis; clique na seta/num card recolhido gira a fila
- Mobile (<700px): 2 cards visíveis (1 em destaque + 1 espiando a próxima), troca por swipe horizontal (sem dots); setas escondidas
- Reduced-motion: troca de destaque sem animação (`transition:none`, salta direto)
- Fallback sem JS/antes da 1ª medição do viewport: os 3 cards ficam empilhados em fluxo normal (sem `position:absolute`) — conteúdo 100% visível mesmo sem JS, vira carrossel de verdade só depois de medido
- 1º layout e resize não animam (`transition:none` por 2 `requestAnimationFrame`, mesma técnica do arquivo de referência) — só a troca por interação do usuário anima
- Detalhe técnico completo: `docs/motion.md` (S03)

## 8. Mobile
- 2 cards visíveis por vez (1 em destaque + 1 espiando), swipe horizontal, sem setas

## 9. Critérios de aceite
- (DoD padrão, com as exceções documentadas no item 10 — tokens de cor/motion não se aplicam integralmente aqui, por pedido explícito do cliente)
- Borda cinza 1px + radius 24px no card, foto com radius 18px e 10px de respiro
- Foto preenche o card com cover, sem distorcer, em qualquer tamanho (ver bug corrigido no item 10)
- Só `left`/`width` animam — nunca `translateX`; card em destaque fica visivelmente por cima durante a troca
- Título só no card em destaque, selo só nos recolhidos, ambos com fade de 0.5s
- Setas, clique num card recolhido e swipe giram a fila
- Resize não quebra o layout — **atenção:** com os valores literais do arquivo (207/253px fixos), o card em destaque pode ficar igual ou mais estreito que os recolhidos entre 360–430px (ver item 10) — reportar se isso aparecer visualmente

## 10. Notas e decisões
- **2026-11-06 — 5 rodadas no mesmo dia**, até bater com o que o cliente queria:
  1. 1ª versão: 1 foto grande por vez, título da seção trocando por slide, setas/swipe entre os 3 — rejeitada, queria os 3 lado a lado e título fixo.
  2. 2ª versão: 3 lado a lado, título fixo, sem interação — cliente pediu as setas de volta e os ícones decorativos no canto superior esquerdo; perguntado o que as setas fariam, respondeu "giram qual fica em destaque".
  3. 3ª versão: revezamento via `flex-grow` numa grade fixa de 3 posições.
  4. 4ª versão: fila giratória via Motion `layout` (FLIP por `transform`), com token do DS pra cor/radius/easing, proporção adaptativa em vez de px fixo. Cliente apontou: borda ainda não parecia certa, transição rápida demais pra ver os cards se cruzando, e a foto distorcia durante a troca.
  5. **Versão atual:** o cliente (via "dono do slider") enviou um documento de direcionamento formal junto com o HTML/CSS/JS de referência completo, pedindo cópia literal da estrutura DOM/CSS/JS — "não reinterprete, não melhore, não troque a técnica". Reimplementado seguindo esse documento ao pé da letra, com só 3 exceções deliberadas (abaixo) e uma ressalva sinalizada (não corrigida sem confirmação):
     - **Técnica de animação:** trocado o Motion `layout` (FLIP/`transform`) pela técnica literal pedida — `transition: left, width` em CSS puro. Isso também resolveu o bug de distorção da foto da rodada anterior (a raiz era exatamente o FLIP por escala não-uniforme do Motion; `left`/`width` crus não têm esse problema, porque o navegador recalcula o `object-fit:cover` a cada frame em vez de esticar uma imagem já renderizada via `transform: scale()`). **Isso é uma exceção pontual às 10 regras de `09-MOTION` (`anima só transform/opacity`)** — pedida explicitamente pelo cliente pra esta seção; não é pra replicar em outras.
     - **Valores literais de CSS:** borda `#CBC9C8`, radius 24/18px, gradiente preto translúcido, fonte do título 36.6px, fonte do h3 22.875px/600, duração/easing `.5s cubic-bezier(.4,0,.2,1)`, setas 48px, breakpoint 700px, larguras 207/253px — todos literais do arquivo, **não** tokens do DS. Exceção pontual documentada aqui, só pra esta seção.
     - **Cor laranja:** usado `--color-primary` (#FF6B00, a mesma laranja do resto do site) em vez do `#FF7A00` literal do arquivo — pra não criar um segundo "laranja" inconsistente com o CTA principal e o resto da marca (regra inegociável do CLAUDE.md).
     - **Título da seção agora é laranja** (cor do `--color-primary`), diferente de todo o resto do site (`h1`/`h2`/`h3` globais são `--color-secondary`, navy) — aplicado porque o documento pediu explicitamente ("Título h2 da seção: cor #FF7A00"). Sinalizando que isso quebra a consistência visual com os outros títulos de seção da página — avisar se não era pra ser assim.
     - **CTA:** mantido o `Button` padrão do site (pílula laranja) em vez do botão retangular (8px) do arquivo — regra inegociável do CLAUDE.md, um único estilo de CTA em todo o site. Única peça do documento que não foi copiada literalmente.
     - **Elemento interativo:** `<button>` no lugar do `<article>`/div-com-onClick do arquivo — mesmo CSS, zero diferença visual, só pra manter o card operável por teclado (AA, regra inegociável do CLAUDE.md).
     - **Ressalva não corrigida (sinalizada, não resolvida sozinho):** os valores literais 207/253px fazem o card em destaque ficar igual ou mais estreito que os recolhidos em telas de 360–430px (`360 − (207+16) = 137px` de destaque, menor que os 207px dos recolhidos) — matematicamente quebrado nessa faixa, que o CLAUDE.md manda testar primeiro. Não troquei pela versão proporcional da rodada anterior porque o documento pediu explicitamente pra não reinterpretar os valores — reportando em vez de decidir sozinho.
     - Container da seção continua 1280px (padrão do site, `.container`) em vez dos 1200px do arquivo — pra não desalinhar com as outras seções da página.
     - Não consegui reproduzir o vídeo de referência enviado pelo cliente neste ambiente (sem player de vídeo disponível) — segui pelo código-fonte completo e pelo documento de direcionamento, que são precisos o suficiente pra não precisar do vídeo.
- Herdou da seção anterior o efeito de paralax "Hero atrasa, Vantagens sobe por cima" (`docs/motion.md` S01) — `id` mudou de `#problema` pra `#vantagens`, `useHeroParallax.ts` atualizado.
- Token `--color-overlay-light` (`styles/design-tokens.css`), criado numa rodada anterior, ficou sem uso nesta seção — não removido por poder servir outra seção no futuro.

## 11. Status
completa, pendente de validação visual do cliente contra o arquivo de referência (não tenho como abrir os dois lado a lado neste ambiente) — e da pendência sinalizada em "4. Layout" (quebra de layout em telas 360–430px)
