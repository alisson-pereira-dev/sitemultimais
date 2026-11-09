# Ficha — S03 Problema (substituída)

**2026-11-06:** esta seção (3 dores: imprevisto financeiro, aperto no cartão, falta de planejamento) foi substituída por um carrossel a pedido do cliente, no mesmo lugar da página (logo após Métricas). Conteúdo/estrutura antigos ficam registrados abaixo só como histórico — a seção ativa hoje é **S03 Vantagens**, ver `docs/sections/vantagens.md`.

A troca remove a etapa explícita de "reconhecer a dor" da jornada PAS (Problema-Agitação-Solução) original do PRD — os 3 novos slides são proposta de valor ("fácil/rápido", "segurança", "tudo em um só lugar"), não mais dores. Sinalizado ao cliente; não bloqueou a execução porque o conteúdo foi explicitamente especificado por ele.

---

## Ficha original (histórico, não reflete o que está no ar)

### 1. Identificação
- slug: problema · Ordem: 2 · Nível: completo · Âncora: #problema (hoje #vantagens)

### 2. Função na narrativa
- Mostrar que a MultiMais entende as dores financeiras reais do dia a dia antes de apresentar os serviços (lógica PAS).
- Papel: interesse.

### 3. Conteúdo
- Chave: `secoes.problema` (removida do content.json em 2026-11-06)
- Itens `validar`: nenhum — dores extraídas de temas reais e recorrentes nos posts do Instagram da MultiMais

### 4. Layout
- Referência: seção "Problema" da ref. Daniela Soares (Behance) — título + lista vertical de dores (ícone + título + descrição curta)
- O que NÃO copiar: foto ao lado (mantido mais simples, sem foto)

### 5. Componentes
- Card/dor (removido de `Card.tsx` em 2026-11-06 — variante ficou sem uso)

### 7. Motion
- Nível: N1 · R2 (stagger de lista, Motion), 3 cards

### 10. Notas e decisões
- Seção adicionada após a fase 6, inspirada na referência Daniela Soares, por decisão explícita do cliente.
- **2026-11-05:** passou a sobrepor o Hero/Métricas ao rolar (efeito de paralax leve — ver `docs/motion.md` S01); esse comportamento foi herdado pela seção Vantagens que a substituiu.
- **2026-11-06:** substituída pelo carrossel Vantagens.
