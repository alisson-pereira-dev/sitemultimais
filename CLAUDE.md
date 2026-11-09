# CLAUDE.md — MultiMais Negócios

## Contexto
- Negócio: financeira/correspondente de crédito, Muritiba-BA
- Objetivo único / CTA principal: "Simular no WhatsApp"
- Público: classe C/D, menos familiarizado com termos financeiros — priorizar clareza absoluta
- Tom de voz: direto, motivacional, acolhedor, sem jargão financeiro
- Direção de Arte: "confiança de banco grande, simplicidade de quem resolve na hora" — limpo, alto contraste, Sora + Inter
- Nível de motion: N1 geral · N2 (parallax) no Hero — **sem N3**: a seção com Card 3D ("Transforme seu limite") foi removida em 2026-11-07 a pedido do cliente; ver `docs/sections/showcase-3d.md`

## Fontes da verdade
- Conteúdo: `content/content.json` — **nenhum texto fixo em componente**
- Tokens: `styles/design-tokens.css` — **nenhum valor literal de cor, fonte, espaço, sombra**
- Fichas de seção: `docs/sections/*.md`
- Jornada: `docs/jornada-ux.md`
- Motion: `docs/motion.md`
- Componentes: `docs/componentes.md`
- PRD: `docs/PRD.md`

## Ordem de trabalho
1. Ler o PRD e `docs/tasks.md`.
2. Executar as tarefas na ordem. **Primeira tarefa: fatia vertical** (tokens + header + hero, sem o parallax/3D ainda). Parar e mostrar para validação.
3. Para cada seção, seguir a ficha em `docs/sections/` e cumprir os critérios de aceite (DoD).
4. ~~A seção "Transforme seu limite" (S08, Card 3D) só entra depois que o resto do site estiver validado — é a tarefa de maior risco técnico/performance.~~ Removida em 2026-11-07 (pedido do cliente); lugar na página assumido pela seção Como funciona redesenhada.
5. Antes de dar uma tarefa por concluída, rodar as verificações (lint, build, Lighthouse quando aplicável).

## Regras inegociáveis
- **Mobile-first.** Testar 360–430px primeiro.
- **Um único CTA principal** (`site.ctas.principal`), sempre com o mesmo estilo (laranja `#FF6B00`, nunca trocado por outra cor em hover — só `brightness(1.1)`).
- **Fatos só com fonte.** Itens `validar: true` no content.json não são apresentados como verdade definitiva; manter a marcação até confirmação do cliente.
- **Acessibilidade AA:** contraste, foco visível, teclado, alt, `lang="pt-BR"`.
- **Motion:** as 10 regras de `09-MOTION`; 3 versões por animação (desktop/mobile/reduced); uma biblioteca por elemento; anima só transform/opacity; conteúdo visível sem JS; nada depende de hover; sem scroll-jacking no mobile.
- **Performance:** LCP < 2,5s, INP < 200ms, CLS < 0,1 — mesmo com o parallax do Hero. Carrega depois do conteúdo crítico (importação dinâmica).
- **Sem segredos no frontend.** Não há variáveis sensíveis neste projeto (sem formulário, sem analytics, sem API de terceiros com chave).
- **Não inventar conteúdo.** Se faltar dado, usar o texto neutro do content.json ou sinalizar — especialmente valores, taxas, datas e credenciais (é financeira).
- **Sem formulário de captura.** Todo contato é via WhatsApp/telefone — não criar um formulário que o cliente não pediu.
- **Sem banner de cookies.** Não há analytics neste projeto; não adicionar rastreadores sem autorização explícita do cliente.

## Decisões do projeto
| Decisão | Valor | Motivo |
|---|---|---|
| Nível de motion | N1 geral · N2 Hero | Equilíbrio entre impacto e clareza/performance pro público-alvo |
| Card 3D ("Transforme seu limite") | Removido (2026-11-07) | Pedido explícito do cliente; lugar na página assumido pela seção Como funciona redesenhada (fundo navy, painel recuado) |
| Tema | Claro (único) | Público não pede modo escuro; simplifica |
| Formulário | Não (WhatsApp) | Fluxo já validado pelo negócio nas redes sociais |
| Analytics | Nenhum | Decisão explícita do cliente |

## Skills a usar
(Preencher conforme o boilerplate do Claude Code: motion/Motion, GSAP+ScrollTrigger só na seção do Hero, mobile, SEO, a11y, auditoria pré-lançamento)

## Mudanças em relação ao boilerplate
| Item alterado | Por quê | Candidato a promover ao boilerplate? |
|---|---|---|
| Sem formulário de lead | Negócio converte 100% via WhatsApp | Não — específico deste cliente |

## Definition of Done (global)
- [ ] Conteúdo vem do content.json
- [ ] Tokens, sem valores literais
- [ ] Responsivo 360px → 1440px+
- [ ] AA, foco, teclado, alt
- [ ] Motion nas 3 versões
- [ ] Sem regressão de performance (incluindo o parallax do Hero)
- [ ] Build e lint sem erros

## Quando estiver em dúvida
Perguntar antes de assumir. Preferir a opção mais simples que atenda à ficha. Em caso de conflito entre impacto visual e clareza para o público C/D, a clareza vence.
