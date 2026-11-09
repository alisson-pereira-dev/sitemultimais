# Ficha — S05 Diferenciais

## 1. Identificação
- slug: diferenciais · Ordem: 3 · Nível: completo · Âncora: #diferenciais

## 2. Função na narrativa
- Reforçar por que simular com a MultiMais e não com outra financeira.
- Papel: interesse.

## 3. Conteúdo
- Chave: `secoes.diferenciais`
- Itens `validar`: textos são discurso da própria marca (posts do Instagram), não claims auditados externamente — tratados como voz da marca, não fato comparativo
- Mídia necessária: nenhuma (ícones apenas)

## 4. Layout
- Referência: variação do catálogo — grid de cards com ícone em container colorido
- Hierarquia: título > grid de 4 itens
- Espaçamento: `--space-section`
- Fundo: `--color-bg`
- O que herdar: ícone em container laranja, ícone branco (padrão DS 2.0)
- O que NÃO copiar: nada específico

## 5. Componentes
- Card/diferencial (ver `docs/componentes.md`)

## 6. Jornada UX
- Vê: 4 motivos (análise rápida, PIX, atendimento humanizado, respeito e confiança)
- Faz: rola
- Reage: reveal escalonado dos cards
- Sente: "não é só mais uma financeira genérica"
- Atrito → mitigação: claims sem prova numérica → mantidos como discurso da marca, sem comparação falsa
- Evento: nenhum

## 7. Motion
- Nível: N1 · Biblioteca: Motion
- Elementos: Cards — R2 (stagger)
- Desktop: stagger 60ms, até 4 itens
- Mobile: mesmo, 1 coluna
- Reduced-motion: aparecem juntos

## 8. Mobile
- 1 coluna, cards compactos

## 9. Critérios de aceite
- (DoD padrão)

## 11. Status
completa
