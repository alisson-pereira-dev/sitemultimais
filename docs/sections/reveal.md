# Ficha — S03B Reveal (cortina com título à deriva)

## 1. Identificação
- slug: reveal · Ordem: 3 (entre Vantagens e Diferenciais) · Nível: completo · Âncora: nenhuma (sem item no menu)

## 2. Função na narrativa
- Pausa/ênfase na rolagem: reafirma em escala grande a frase que abre a seção Vantagens ("A vida não espera o dinheiro aparecer"), como um eco visual antes de entrar nos diferenciais da empresa.
- Papel: transição/reforço entre "interesse" (Vantagens) e a lista de diferenciais — não é uma seção de conteúdo novo, é um respiro dramático.
- **2026-11-07:** essa frase era o título grande da seção Vantagens até esta tarefa — migrou pra cá a pedido do cliente (perguntei se ele queria repetir nas duas seções ou tirar de Vantagens; escolheu tirar). Vantagens ficou só com a etiqueta "A gente sabe como é" acima do carrossel — ver `docs/sections/vantagens.md`.

## 3. Conteúdo
- Chave: `secoes.reveal` — só `titulo` (string). Texto reaproveitado do que já existia em Vantagens, não é conteúdo novo/inventado.
- Itens `validar`: nenhum

## 4. Layout e implementação (fiel ao arquivo de referência do cliente)
- **Fonte da verdade:** HTML/CSS/JS completo enviado pelo cliente em 2026-11-07, com o guia "copie estrutura, valores e lógica" — mesma postura de fidelidade literal já seguida no carrossel de Vantagens (`docs/sections/vantagens.md`).
- Mecânica ("efeito cortina"): a seção tem uma camada `position:fixed` (fundo cheio, degradê laranja) que **não acompanha o scroll**. Um `clip-path:inset(0)` na seção ancestral recorta essa camada fixa pra só aparecer dentro da caixa da seção — por isso a seção anterior (Vantagens) sobe e "revela" o fundo fixo, e a seguinte (Diferenciais) sobe e "cobre" de novo, como uma cortina.
- O título tem uma deriva vertical lenta (~64px de amplitude) enquanto a seção atravessa a tela, via uma tabela de 11 pontos medidos (curva não-linear, mais inclinada nas pontas) — não é scroll-jacking: segue o scroll 1:1, sem suavização/easing próprio, sem travar a rolagem.
- DOM: `.reveal` (clip-path) → `.pinned` (fixed, fundo) → `.box` (área útil, 80px de respiro) → `.boxInner` (largura máx. 856px) → `.titlePos` (âncora) → `.titleShift` (só o `transform` muda via JS) → `h2`
- **Exceções/adaptações em relação ao arquivo:**
  - Cor de fundo: degradê laranja (`linear-gradient(135deg, var(--color-primary), var(--color-primary-soft))`, pedido do cliente em 2026-11-07) em vez do roxo `#8D0DE3` do arquivo (cor de outra marca, sem relação com a MultiMais) ou do navy que eu tinha usado antes — a própria tabela "o que pode ser modificado" do arquivo já lista a cor como editável.
  - **Contraste do título — ressalva não resolvida, só sinalizada:** apliquei `--color-primary-contrast` (navy) no título primeiro, porque branco sobre esse laranja é ~2,85:1 (abaixo até do mínimo AA de 3:1 pra texto grande) — mesmo problema já resolvido assim no CTA principal. O cliente viu essa versão e pediu branco mesmo assim; troquei pra `--color-text-inverse` (branco) a pedido dele, mas **a falha de contraste AA continua** — não decidi reverter sozinho de novo, só avisando.
  - Tamanho do título: 100px no desktop/motion (**2026-11-07: aumentado a pedido do cliente** — era 76.14px, literal igual ao arquivo); `clamp(2rem, 1.5rem + 2.2vw, 3.75rem)` no fallback (não os 44px literais do arquivo, já que o fallback aqui também muda de mecânica — não é só "reduzir fonte", é desligar o pin inteiro). `.boxInner`/`.titulo` também alargados de 856px pra 960px pra acompanhar
  - Fonte: `--font-heading` (Sora) — o arquivo pede uma fonte própria (nuSansDisplay) não licenciada/carregada no projeto
  - Tabela de deriva (`TY_TABLE`) e `REST` (-44.14px): copiados literalmente, sem nenhuma alteração

## 5. Componentes
- Nenhum componente compartilhado novo — é uma seção isolada, sem usar `Section`/`Card`/etc. (estrutura de DOM própria, exigida pelo efeito)

## 6. Jornada UX
- Vê: o fundo laranja em degradê "gruda" na tela enquanto a seção de cima sobe, revelando um título grande que se desloca bem devagar
- Faz: continua rolando
- Reage: nenhuma interação — é só leitura/pausa visual
- Sente: ênfase, ritmo de respiro antes da próxima seção
- Atrito → mitigação: nenhum (não bloqueia a rolagem, não trava, não precisa de interação)
- Evento: nenhum

## 7. Motion
- Nível: **exceção pontual de motion** (mesmo espírito do N2 do Hero, mas um efeito próprio, não documentado nas 10 regras de `09-MOTION` como receita padrão) — pedida explicitamente pelo cliente, com arquivo de referência detalhado
- Desktop (≥1024px) + `prefers-reduced-motion: no-preference`: `position:fixed` + `clip-path` + deriva do título via scroll (`requestAnimationFrame`, `{passive:true}`)
- Fora disso (mobile OU reduced-motion): a seção cai pra um bloco normal — sem `position:fixed`, sem `clip-path`, sem deriva; só um bloco em degradê laranja centralizado com o título parado, em fluxo normal de página (nunca "pinado")
- Reduced-motion (mesmo em desktop): título fica parado na posição de repouso (`REST = -44.14px`, convertido pro fallback), sem nenhum deslocamento
- Fallback sem JS: o efeito central (cortina — pin + revela + cobre) é **100% CSS**, funciona sem nenhuma linha de JS, contanto que a tela seja ≥1024px (a media query do CSS não depende de JS pra existir). Só a deriva do título depende de JS; sem JS o título fica parado na posição de repouso definida no CSS (`transform` padrão do `.titleShift`)
- Cuidado replicado do arquivo: nenhum ancestral de `.pinned` pode ter `transform`/`filter`/`will-change:transform` — isso quebraria o `position:fixed` (passaria a ser relativo a esse ancestral, não à viewport)

## 8. Mobile
- Bloco estático normal (degradê laranja, título centralizado, sem pin/deriva) — ver item 7

## 9. Critérios de aceite
- (DoD padrão, com a exceção de motion documentada acima)
- O fundo fixo nunca aparece por cima de Vantagens ou Diferenciais (clip-path contendo corretamente)
- Sem CLS: o fallback mobile/reduced-motion não pisca nem salta ao trocar de estado
- `prefers-reduced-motion`: título sempre parado, nunca se desloca

## 10. Notas e decisões
- **2026-11-07:** seção criada a pedido do cliente, com arquivo de referência HTML/CSS/JS completo e comentado (mesmo padrão de entrega já visto no carrossel de Vantagens). Não consegui abrir/comparar visualmente com o arquivo de referência neste ambiente (sem browser disponível) — implementado seguindo o código-fonte e os comentários do próprio arquivo, que eram bastante explícitos sobre a mecânica e os valores.
- Frase do título migrada de `secoes.vantagens.titulo` (removido) pra `secoes.reveal.titulo` — ver `docs/sections/vantagens.md` item 10.
- Decisão própria (não testada visualmente): desliguei o efeito inteiro fora de desktop+motion, seguindo o mesmo critério já usado no Hero e no carrossel de Vantagens, mesmo o arquivo de referência não desligando explicitamente em mobile (só reduz o tamanho da fonte). Risco: `position:fixed` em telas pequenas pode ter comportamento inconsistente entre navegadores móveis (barra de endereço retrátil etc.) — por isso a cautela.

## 11. Status
completa, com uma pendência real de acessibilidade (título branco sobre laranja falha contraste AA — ver item 10) e sem validação visual do cliente contra o arquivo de referência (sem ambiente de browser neste ambiente)
