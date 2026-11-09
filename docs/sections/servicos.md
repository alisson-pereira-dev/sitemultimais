# Ficha — S06 Serviços

## 1. Identificação
- slug: servicos · Ordem: 7 · Nível: completo · Âncora: #servicos

## 2. Função na narrativa
- Apresentar os 6 serviços reais oferecidos pela MultiMais, de forma escaneável.
- Papel: interesse.

## 3. Conteúdo
- Chave: `secoes.servicos`
- Itens `validar`: nenhum — serviços confirmados na bio do Instagram
- **2026-11-07:** os 6 itens têm foto real (prefixo `serv_`, fornecidas pelo cliente em 2 lotes — 5 de início, "Limite do cartão em dinheiro" completou o conjunto depois). O fallback ícone + degradê de marca (ver item 4) continua existindo no código pra qualquer item futuro sem `imagem`, mas não é mais usado por nenhum dos 6 atuais.

## 4. Layout — dois modos

### Modo simples (padrão, fallback)
- Carrossel horizontal com scroll nativo + `scroll-snap`, setas que chamam `scrollBy`
- Hierarquia: título > subtítulo > carrossel
- Fundo: `--color-bg-alt`
- Card: foto 4:3 no topo (quando o item tem `imagem` — hoje, todos os 6) com selo de ícone flutuante no canto inferior esquerdo, + título + descrição curta + link "Simular" abaixo. Sem foto (fallback, nenhum item hoje): layout antigo, ícone solto no topo do corpo do card.

### Modo "creative" (Swiper, ≥1100px + motion permitido)
- **2026-11-07 — pedido do cliente, com arquivo de referência HTML/CSS/JS completo** (mesmo padrão de fidelidade literal já usado em Vantagens/Reveal): "reproduza de forma IDÊNTICA... use a MESMA biblioteca (Swiper) com os MESMOS parâmetros — não reimplemente o movimento à mão."
- Lib real `swiper` (não uma reimplementação com Motion/GSAP) — instalada via npm, **upgrade pra v14 em vez da v11 do arquivo de referência**: a v11 tem uma vulnerabilidade crítica conhecida (prototype pollution, GHSA-hmx5-qpq5-p643); v14 é a primeira versão corrigida e mantém a mesma API/parâmetros do `creativeEffect` usados no arquivo
- Estrutura: título + CTA à esquerda (coluna fixa, 444px); carrossel de cards à direita, **sangrando até a borda da janela** (`.swiper` mais largo que sua própria coluna, `overflow-x:hidden` na seção inteira corta o excesso exatamente na borda do viewport); 2 setas circulares abaixo, alinhadas à direita
- Efeito "creative": ao avançar, o card da frente recua em profundidade (`translateZ(-400px)`) e some em opacidade, em vez de deslizar — parâmetros do Swiper (`effect`, `speed:850`, `creativeEffect.prev/next`, etc.) copiados literalmente do arquivo de referência, não alterados
- Card: foto real como fundo (`next/image` `fill`) + gradiente de leitura escuro + selo de ícone + título + botão "Simular" (pílula com borda, não preenchida). Sem foto (fallback, nenhum item hoje): fundo em degradê com tokens de marca (`--color-secondary-medium` → `--color-secondary`).
- **Gradiente de leitura (`.cardShade`) escurecido em 2026-11-07, pedido do cliente:** era `var(--color-overlay)` (0,6 de opacidade) só até 60% da altura; agora 3 pontos — `rgba(15,31,92,.85)` embaixo → `.45` em 35% → transparente em 70% — mais escuro e cobrindo mais área, pro texto ficar legível mesmo em fotos mais claras. Continua azulado, não preto puro (mesma regra de sombra do DS: "base azul, nunca preto puro").
- **Adaptações em relação ao arquivo** (mesmo espírito das exceções já documentadas em Vantagens/Reveal):
  - Cor da marca: `--color-primary` (laranja da MultiMais) nas setas, em vez do roxo `#8D0DE3` do arquivo — ícone das setas em `--color-primary-contrast` (navy), não branco, porque branco sobre laranja falha contraste AA (mesmo ajuste já feito no CTA principal)
  - Cor do título/CTA à esquerda: tokens do site (`--color-secondary` pro título, `Button` padrão pro CTA — pílula, não o botão roxo do arquivo), mantendo consistência com o resto do site
  - Selo "Nubank" (tag repetida em todo card) removido — não existe equivalente real pra MultiMais, e repetir "MultiMais" 6 vezes seria só ruído; o ícone do serviço faz esse papel de identidade visual no lugar
  - Botão "Leia aqui" → "Simular" (reaproveita o CTA de WhatsApp já usado nos outros cards de serviço do site, não um link de blog)
  - Largura/altura/radius/tipografia: valores literais (px) copiados do arquivo, não os tokens do DS — mesma exceção documentada já usada em Vantagens/Reveal

## 5. Componentes
- Modo simples: Card/servico, Carrossel nativo (ver `docs/componentes.md`)
- Modo "creative": nenhum componente compartilhado — markup próprio dentro de `Servicos.tsx`, porque a lib Swiper exige classes HTML literais específicas (`swiper`, `swiper-wrapper`, `swiper-slide`) que não podem passar pelo CSS Module

## 6. Jornada UX
- Vê: carrossel com 6 serviços (modo simples) ou título+CTA à esquerda com cards sangrando à direita (modo "creative")
- Faz: arrasta/toca nas setas (ou arrasta o carrossel com o mouse, modo "creative"); toca em um card
- Reage: cards deslizam (modo simples) ou recuam em profundidade 3D (modo "creative"); toque no card leva direto ao WhatsApp mencionando o serviço
- Sente: "eles fazem exatamente o que eu preciso, não só empréstimo"
- Atrito → mitigação: carrossel pode esconder itens → indicação visual de "tem mais" (fade no modo simples; card cortado sangrando na borda, no modo "creative")
- Evento: não instrumentado agora

## 7. Motion
- Nível: N1 (modo simples: R2 entrada + R10 hover/tap) · **exceção pontual de motion no modo "creative"** (efeito 3D do Swiper, não é nenhuma das 10 receitas padrão de `09-MOTION` — pedido explícito do cliente, arquivo de referência completo)
- Modo simples — Desktop: stagger na entrada; hover eleva o card (`--shadow-3`, sobe 4px). Mobile: sem hover — toque dá `scale(0.98)`; arrasto nativo (scroll-snap). Reduced-motion: cards aparecem sem deslocamento; arrasto continua normalmente.
- Modo "creative" — só monta com JS, ≥1100px e `prefers-reduced-motion: no-preference`; fora disso (mobile, telas menores, reduced-motion, ou sem JS) o modo simples acima é tudo que existe — nunca os dois ao mesmo tempo
- JS do Swiper carregado sob demanda (`import()` dinâmico) só quando as condições acima batem — quem recebe o fallback nunca baixa essa lib

## 8. Mobile
- Modo simples sempre (o "creative" não roda abaixo de 1100px) — scroll horizontal por toque, sem setas

## 9. Critérios de aceite
- (DoD padrão)
- Setas com rótulo acessível ("Próximo serviço"/"Serviço anterior"), navegável por teclado, nos dois modos
- Modo "creative" nunca aparece em telas <1100px, sem JS, ou com `prefers-reduced-motion`
- Carrossel "creative" corta exatamente na borda da janela, sem criar barra de rolagem horizontal na página

## 10. Notas e decisões
- **2026-11-07:** modo "creative" adicionado a pedido do cliente, com arquivo de referência HTML/CSS/JS completo (mesmo padrão de entrega já visto em Vantagens/Reveal) — instrução explícita de usar a mesma lib (Swiper), não reimplementar o movimento. Dependência `swiper` adicionada ao projeto (v14, não v11 — ver item 4, nota de segurança).
- Não consegui comparar visualmente com o arquivo de referência neste ambiente (sem browser disponível) — implementado seguindo o código-fonte e os parâmetros exatos do arquivo.
- **2026-11-07 (correção, mesmo dia):** cliente reportou a animação de saída do card "dura". Raiz: o Swiper só define a *duração* da transição via JS (`transitionDuration` inline); a *curva* (`transition-timing-function`) fica no padrão do navegador (`ease`, mais mecânico) porque nem o arquivo de referência nem a lib especificam uma curva própria pro efeito `creative`. Corrigido forçando `--ease-standard` (a única easing do DS) em `.swiper-slide` via CSS (`:global`, já que é a classe literal que o Swiper procura — não passa pelo CSS Module).

## 11. Status
completa, pendente de validação visual do cliente (sem ambiente de browser pra comparar com o arquivo de referência)
