# Ficha — S16 FAQ

## 1. Identificação
- slug: faq · Ordem: 8 · Nível: completo · Âncora: #faq

## 2. Função na narrativa
- Tirar as últimas dúvidas antes da decisão, reduzindo fricção/medo.
- Papel: decisão.

## 3. Conteúdo
- Chave: `secoes.faq`
- Itens `validar`: todas as 4 respostas — precisam de confirmação da equipe (documentos, prazos, segurança)
- Mídia necessária: nenhuma

## 4. Layout
- Referência: V2 do catálogo / ref. Daniela Soares — duas colunas (CTA fixo à esquerda + lista à direita)
- Hierarquia: título > subtexto > CTA | lista de perguntas
- Espaçamento: `--space-section`
- Fundo: `--color-bg`
- O que herdar: estrutura de 2 colunas
- O que NÃO copiar: nada específico

## 5. Componentes
- Accordion, Botão/primário (ver `docs/componentes.md`)

## 6. Jornada UX
- Vê: "Dúvidas frequentes" com CTA fixo à esquerda (desktop) + lista à direita
- Faz: toca numa pergunta pra abrir
- Reage: accordion expande com transição de altura controlada
- Sente: "resolveram minha última dúvida antes de eu decidir"
- Atrito → mitigação: respostas genéricas (`validar`) → equipe precisa confirmar documentos/prazos reais antes do lançamento
- Evento: `faq_open` (pergunta)

## 7. Motion
- Nível: N1 · Biblioteca: CSS/primitivo acessível
- Elementos: Accordion — R17
- Desktop/Mobile: abertura por transição de altura controlada, `--dur-base`
- Reduced-motion: abre/fecha sem transição, instantâneo
- Cuidado: nunca estourar layout durante a transição (altura sempre controlada)

## 8. Mobile
- Empilha — CTA primeiro, depois a lista

## 9. Critérios de aceite
- (DoD padrão)
- Botão com `aria-expanded`, navegação por Enter/Espaço

## 10. Notas e decisões
- Todas as respostas estão marcadas `validar: true` no content.json — não publicar sem confirmação da equipe.

## 11. Status
completa — conteúdo pendente de validação do cliente
