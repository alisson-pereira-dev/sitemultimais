# Ficha — S17 Contato

## 1. Identificação
- slug: contato · Ordem: 9 · Nível: completo · Âncora: #contato

## 2. Função na narrativa
- Dar a ação direta de contato: WhatsApp, ligar, rota.
- Papel: decisão/ação.

## 3. Conteúdo
- Chave: `secoes.contato`
- Itens `validar`: `site.contato.horarios` — só confirmado quarta-feira pelo print do Google
- Mídia necessária: mapa (embed sob demanda)

## 4. Layout
- Referência: padrão do catálogo — endereço/horário + botões grandes de ação
- Hierarquia: título > subtítulo > botões de contato > endereço/horário
- Espaçamento: `--space-section`
- Fundo: `--color-bg-alt`
- O que herdar: nada específico de referência externa
- O que NÃO copiar: não aplicável

## 5. Componentes
- Botões de contato (ver `docs/componentes.md`)

## 6. Jornada UX
- Vê: endereço, horário, botões grandes de WhatsApp/ligar/rota
- Faz: toca em "WhatsApp", "ligar" ou "ver rota"
- Reage: abre o app correspondente direto (sem preencher nada)
- Sente: "sei exatamente onde ficam e como falar com eles"
- Atrito → mitigação: mapa pesado → carrega só ao tocar, não no load da página
- Evento: `whatsapp_click` (origem: contato)

## 7. Motion
- Nível: N0–N1 · Biblioteca: CSS
- Elementos: Botões de contato — R10 (hover/tap)
- Reduced-motion: sem alteração (já é N0/N1 mínimo)

## 8. Mobile
- Botões grandes empilhados, mapa sob demanda

## 9. Critérios de aceite
- (DoD padrão)
- Mapa não carrega antes do toque (evita CLS/peso)
- Horário marcado `validar` não apresentado como definitivo

## 11. Status
completa — horário pendente de confirmação do cliente
