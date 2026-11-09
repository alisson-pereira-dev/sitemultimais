# Ficha — S00 Header

## 1. Identificação
- slug: header · Ordem: 0 · Nível: completo · Âncora: (fixo, sem âncora própria)

## 2. Função na narrativa
- Dar acesso imediato ao CTA principal e à navegação em qualquer ponto do scroll.
- Papel: entrada · Relação com o CTA: primeira aparição do CTA principal.

## 3. Conteúdo
- Chave: `site.menu`, `site.logo`, `site.ctas.principal`
- Itens `validar`: nenhum
- Mídia necessária: logo (ver `assets-needed.md` — bloqueia)

## 4. Layout
- Referência: padrão do catálogo (fixo, ganha fundo ao rolar)
- Estrutura: logo à esquerda, menu central/direita, CTA à direita (desktop); logo + CTA compacto + hambúrguer (mobile)
- Hierarquia: logo > CTA > menu
- Espaçamento: altura ≤ 64px
- Fundo: transparente no topo → `--color-bg` + `--shadow-2` ao rolar
- **Cor do texto (desde 2026-11-04):** no topo da home (painel escuro da Hero por baixo, transparente, antes de rolar), logo/menu/hambúrguer ficam em `--color-text-inverse` (branco) — modificador `.overHero`. Em qualquer outra página (sem Hero escura) ou depois de rolar, continua `--color-secondary` (navy) como sempre foi.
- O que herdar: comportamento de fundo reativo ao scroll
- O que NÃO copiar: nada específico de referência externa aqui

## 5. Componentes
- Header, Menu mobile, Botão/primário (ver `docs/componentes.md`)
- Novos componentes a especificar? não

## 6. Jornada UX
- Vê: logo, menu, CTA sempre visível
- Faz: rola a página; no mobile, toca no hambúrguer
- Reage: fundo transparente vira branco com sombra ao rolar; menu abre em painel com foco preso
- Sente: "o contato está sempre à mão"
- Atrito → mitigação: nenhum esperado (CTA nunca some)
- Evento: `cta_principal_click` (origem: header) — documentado, não implementado

## 7. Motion
- Nível: N1 · Biblioteca: CSS (fundo) + Motion (painel mobile)
- Elementos: fundo/sombra (R13) · painel mobile (R11)
- Desktop: mudança de fundo em `--dur-fast` após ~80px de scroll
- Mobile: painel entra em ≤ 300ms, foco no primeiro link
- Reduced-motion: mudança de fundo instantânea; painel sem transição de posição
- Fallback: header e menu funcionam sem o efeito de fundo

## 8. Mobile
- Altura ≤ 64px; logo + CTA compacto + hambúrguer
- Menu abre em painel/tela cheia, fecha ao navegar ou Esc, trava scroll do fundo
- Alvos ≥ 44px

## 9. Critérios de aceite
- (DoD padrão)
- Foco preso no menu mobile quando aberto
- Nenhum item de menu acima de 6

## 10. Notas e decisões
- CTA nunca é escondido ao rolar — regra explícita do componente.
- **2026-11-04:** a pedido do cliente, o header passou a de fato sobrepor a Hero (antes havia um espaço reservado no topo da Hero pro header "não bater" no conteúdo). Como a Hero agora tem painel escuro com foto, o texto do header precisa trocar de cor nesse estado específico — só na home, só antes de rolar (ver item 4). Em `/privacidade`, `/termos` e na 404 (sem Hero escura), o header nunca usa essa variante.

## 11. Status
completa
