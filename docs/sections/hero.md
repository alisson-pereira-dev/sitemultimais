# Ficha — S01 Hero

## 1. Identificação
- slug: hero · Ordem: 1 · Nível: completo · Âncora: #inicio

## 2. Função na narrativa
- Fazer o visitante entender em 5s que a MultiMais resolve o problema de crédito dele, aqui em Muritiba, e chamar no WhatsApp.
- Papel: entrada · CTA: primeira aparição visual de destaque do CTA principal.

## 3. Conteúdo
- Chave: `secoes.hero`
- Itens `validar`: nenhum no texto; `midia.src` pendente (ver assets-needed.md)
- Mídia necessária: foto de atendimento/pessoa (painel full-bleed — ver nota no item 10)
- Campos extra (desde 2026-11-04): `destaque` (linha de recurso com ícone, abaixo do CTA). Havia também um `selo` (card flutuante "+900 famílias atendidas") — removido em 2026-11-05 a pedido do cliente (ver item 10); campo retirado do content.json/types. Havia também `etiqueta` (pílula "MultiMais Negócios" acima da headline) — removida em 2026-11-05 a pedido do cliente (ver item 10); campo retirado do content.json/types.

## 4. Layout
- Referência: split (texto à esquerda, imagem à direita no desktop); painel navy cheio com cantos arredondados, foto sangrando até a borda do painel — baseado numa 2ª referência trazida pelo cliente (mesmo site Daniela Soares, print do Hero completo), substituindo o tratamento mais leve da v1
- Hierarquia: headline > CTA principal > subheadline > CTA secundário > linha de destaque (ícone + texto curto)
- Espaçamento: `--space-section` (padding externo); painel interno com padding próprio
- Fundo: painel em gradiente `--color-secondary` → `--color-secondary-medium`, com camada de glow sutil (laranja/amarelo, blur) atrás do texto para o parallax (R4) — a página em volta do painel continua `--color-bg` claro (Tema claro único do site preservado; só este painel contido é escuro, mesmo padrão de painel escuro contido também usado em "Como funciona")
- O que herdar: estrutura split, painel com cantos arredondados
- O que NÃO copiar: carrossel de logos de parceiros (sem logos reais da MultiMais — ver `assets-needed.md`); card de prova social (removido, ver item 10)

## 5. Componentes
- Botão/primário, Botão/secundário (variante clara, sobre fundo escuro), Mídia/painel (ver `docs/componentes.md`)
- Novos componentes a especificar? não — `SquircleMedia` ganhou a prop `shape="panel"` só pra esta seção; Sobre e CTA final continuam com `shape="squircle"` (padrão)

## 6. Jornada UX
- Vê: headline "Precisando de dinheiro? A gente resolve.", foto de atendimento, botão WhatsApp + botão ligar
- Faz: toca no botão principal
- Reage: abre WhatsApp com mensagem pronta; botão dá feedback de pressão (`scale(0.98)`)
- Sente: "é simples, é rápido, é aqui em Muritiba"
- Atrito → mitigação: foto lenta para carregar → texto e CTA não dependem da imagem pro LCP
- Evento: `cta_principal_click` (origem: hero)

## 7. Motion
- Nível: N1 (texto/CTA) + N2 (parallax de fundo)
- Biblioteca: Motion (texto, R1) · GSAP ScrollTrigger (parallax, R4) — uma por elemento
- Desktop: stagger de 80ms headline→subheadline→CTA (`--dur-slow`); fundo desloca ≤10% da altura ao rolar
- Mobile: mesma sequência de texto, mais curta; parallax **desligado**
- Reduced-motion: tudo aparece direto; parallax desligado
- Fallback: headline, subheadline e CTA já no HTML, visíveis por padrão

## 8. Mobile
- Headline com `clamp()`, CTA visível sem rolar (primeira dobra)
- Texto acima, imagem abaixo
- Imagem do Hero não recebe animação de parallax

## 9. Critérios de aceite
- (DoD padrão)
- LCP da imagem/headline do hero < 2,5s no mobile
- Parallax não aplica na imagem crítica de LCP

## 10. Notas e decisões
- O card 3D foi movido para a seção própria S08 (depois removida em 2026-11-07, ver `docs/sections/showcase-3d.md`) — o Hero mantém só o parallax leve (N2).
- **2026-11-04 — redesign a pedido do cliente:** trocado o tratamento da foto de squircle (32%/28%, elemento de marca do DS 2.0) para um painel retangular arredondado full-bleed, só nesta seção — **exceção documentada à regra do DS**; squircle continua exclusivo de Sobre e CTA final. Motivo: referência visual trazida pelo cliente.
- **2026-11-05:** o card flutuante de prova social ("+900 famílias atendidas", dado real informado diretamente pelo responsável do negócio) foi removido a pedido do cliente.
- **2026-11-05:** a etiqueta/pílula "MultiMais Negócios" acima da headline foi removida a pedido do cliente.
- **2026-11-05:** a pedido do cliente, o painel do Hero agora acompanha o scroll mais devagar que a página (GSAP ScrollTrigger, `useHeroParallax.ts`) enquanto Métricas e Problema sobem no ritmo normal e o cobrem aos poucos — paralax de verdade (descompasso de velocidade), não um congelamento; duas tentativas anteriores no mesmo dia (`position: sticky` travando o Hero 100%; depois o painel encolhendo/escurecendo) foram descartadas a pedido do cliente. Ver `docs/motion.md` (S01) para o detalhe técnico; só desktop/motion permitido, sem efeito em mobile ou `prefers-reduced-motion`.
- O carrossel de logos de parceiros com rolagem automática (visto na referência) não entrou — sem logos reais da MultiMais, criaria um sinal de confiança inventado. Registrado como pendência em `assets-needed.md`. **Atualização 2026-11-05:** o cliente pediu, separadamente, um slide automático de métricas logo abaixo do Hero — ver nova seção/ficha `docs/sections/metricas.md` (S02). Diferente do carrossel de logos (que seria um sinal de confiança de terceiros inventado), aqui os números são marcados `validar: true` e tratados como placeholder explícito a substituir antes do lançamento.

## 11. Status
completa
