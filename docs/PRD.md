# PRD — MultiMais Negócios

## 1. Visão
- MultiMais Negócios é uma financeira/correspondente de crédito em Muritiba, BA, oferecendo empréstimo pessoal, crédito pessoal, consórcio, abertura de contas, saque FGTS e transformação de limite de cartão em dinheiro. Atende um público majoritariamente classe C/D, que valoriza clareza e simplicidade acima de sofisticação.
- **Objetivo único do site / CTA principal:** "Simular no WhatsApp" — leva direto à conversa com a equipe, sem formulário.
- Nível: completo
- Direção de Arte (resumo): confiança de banco grande, simplicidade de quem resolve na hora — visual limpo e organizado, mas direto e sem jargão.
- Nível de motion geral: N1 no site, com N2 (parallax leve) no Hero (estendido até Vantagens, efeito de sobreposição). Duas exceções pontuais adicionais, pedidas explicitamente pelo cliente com arquivos de referência: o carrossel de Vantagens (S03) e a seção Reveal (S03B) — detalhe em `docs/motion.md`.

## 2. Escopo
### Inclui
- Seções (ordem): Header → Hero → Métricas → Vantagens → Reveal (cortina) → Diferenciais → Serviços → Como funciona → Sobre → FAQ → Contato → CTA final → Footer
- Páginas de sistema: 404, Política de Privacidade, Termos de Uso
- Integrações: WhatsApp (CTA principal + CTA flutuante mobile), telefone, mapa sob demanda (Contato)

### Não inclui (nesta versão)
- Formulário de captura de lead (fluxo é 100% WhatsApp)
- Analytics/rastreadores (decisão do cliente — sem banner de cookies por não haver cookies não essenciais)
- Depoimentos/avaliações (sem avaliações públicas reais ainda — Google Maps está sem avaliações)
- Blog, área logada, multi-idioma

## 3. Arquitetura da informação
- Site de página única (scroll), com âncoras por seção: #inicio, #vantagens, #servicos, #como-funciona, #faq, #contato
- Páginas separadas: /privacidade, /termos, 404
- Menu: Serviços · Como funciona · Dúvidas · Contato
- Fluxo do CTA principal: Header (sempre visível) → Hero → Como funciona (fim) → CTA final → CTA flutuante (mobile, todo o scroll) — todos abrem WhatsApp com mensagem pré-preenchida (`site.contato.whatsapp.mensagem_padrao`)

## 4. Design system
- Ref: `styles/design-tokens.css` / `.json` e `docs/design-system.md` (DS 2.0 oficial do cliente, extraído de `Multimais-System.html`)
- Cores: laranja `#FF6B00` (ação), azul `#0F1F5C` (confiança/títulos), amarelo `#FFC700` (destaque pontual)
- Tipografia: Sora (títulos) + Inter (corpo)
- Elemento de marca: squircle (`32% / 28%`) exclusivo para fotos de pessoas

## 5. Componentes
Ref: `docs/componentes.md` — Header, Menu mobile, Footer, Container/Section, Botão, CTA flutuante, Card (dor/diferencial/serviço), Passo numerado ("Como funciona"), Marquee foto+palavra (Sobre), Selo, Mídia, Accordion, Carrossel, Botões de contato, Página 404

## 6. Seções
| Ordem | ID | Seção | Ficha | Resumo |
|---|---|---|---|---|
| 1 | S00 | Header | `docs/sections/header.md` | Logo, menu, CTA sempre visível |
| 2 | S01 | Hero | `docs/sections/hero.md` | Headline + CTA duplo + foto; parallax leve de fundo |
| 3 | S02 | Métricas | `docs/sections/metricas.md` | Slide automático com números ilustrativos (placeholder) |
| 4 | S03 | Vantagens | `docs/sections/vantagens.md` | 3 cards (fácil, segurança, tudo num lugar só), estilo Hero do Inter — substituiu a seção Problema |
| 5 | S03B | Reveal | `docs/sections/reveal.md` | Cortina com fundo fixo e título à deriva — ênfase antes de Diferenciais |
| 6 | S05 | Diferenciais | `docs/sections/diferenciais.md` | 4 motivos pra simular com a MultiMais |
| 7 | S06 | Serviços | `docs/sections/servicos.md` | Carrossel com os 6 serviços oferecidos |
| 8 | S07 | Como funciona | `docs/sections/como-funciona.md` | 4 passos numerados, painel navy recuado com cantos arredondados |
| 9 | S04 | Sobre | `docs/sections/sobre.md` | Marquee "Atendimento humanizado" — 4 faixas de foto+palavra rolando |
| 10 | S16 | FAQ | `docs/sections/faq.md` | Perguntas frequentes, duas colunas |
| 11 | S17 | Contato | `docs/sections/contato.md` | Endereço, horário, botões de ação direta |
| 12 | S19 | CTA final | `docs/sections/cta-final.md` | Último convite, foto real + botão |
| 13 | S23 | Footer | `docs/sections/footer.md` | Contato, links legais, copyright |

*(S08 "Transforme seu limite", Card 3D interativo, removida em 2026-11-07 a pedido do cliente — ver `docs/sections/showcase-3d.md` para o histórico.)*

## 7. Jornada UX
Ref: `docs/jornada-ux.md` — macro cobre descoberta → interesse → confiança → decisão → ação; CTA principal em 5 pontos (header, hero, como_funciona, cta_final, flutuante mobile). Eventos de analytics documentados mas **não implementados** (sem ferramenta de analytics neste projeto).

## 8. Motion
Ref: `docs/motion.md` — N1 geral, N2 no parallax do Hero. Sem N3 (a seção com Card 3D foi removida em 2026-11-07). 3 versões (desktop/mobile/reduced-motion) obrigatórias em toda animação, conforme `09-MOTION.md`.
Bibliotecas: CSS (padrão) · Motion/React (reveals com stagger) · GSAP ScrollTrigger (parallax do Hero).

## 9. Requisitos não funcionais
- **Performance:** LCP < 2,5s · INP < 200ms · CLS < 0,1 (mobile), orçamento-alvo verificado no build real — o parallax não pode comprometer esse orçamento; carrega depois do conteúdo crítico.
- **Acessibilidade:** WCAG AA.
- **SEO:** metas por página, sitemap, robots.txt, JSON-LD LocalBusiness com dados reais (endereço, telefone).
- **Segurança:** HTTPS, headers padrão, sem segredos no frontend.
- **Privacidade:** por ser financeira, política de privacidade e termos são **obrigatórios** e precisam de revisão jurídica antes do lançamento (coleta de dados pessoais no contato via WhatsApp).
- **Compatibilidade:** mobile-first, 360px a 1440px+.

## 10. Conteúdo
- Fonte única: `content/content.json`
- Itens `validar`: ver `meta.pendencias_validar` no content.json
- Ativos pendentes: ver `docs/assets-needed.md`

## 11. Critérios de sucesso
- Site fiel às fichas em 60–70% no primeiro build
- Métricas de performance dentro do orçamento-alvo, mesmo com o parallax do Hero
- CTA principal (WhatsApp) funcionando ponta a ponta nas 5 ocorrências

## 12. Riscos e suposições
| Risco/suposição | Impacto | Mitigação |
|---|---|---|
| Tabela de valores/taxas vista nos posts do Instagram pode estar desatualizada | Legal/confiança | Não incluída no site nesta versão — só após confirmação do cliente |
| Textos do Sobre e respostas do FAQ ainda genéricos | Confiança | Marcados `validar`; cliente confirma antes do lançamento |
| Sem política de privacidade/termos prontos | Bloqueia lançamento (financeira = dado sensível) | Claude Code gera rascunho técnico; revisão jurídica obrigatória antes de publicar |
| Logo oficial ainda não está em alta resolução/vetor | Qualidade visual de header/favicon | Usar placeholder até receber o arquivo; ver `assets-needed.md` |
