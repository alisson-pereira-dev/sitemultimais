# Ficha — S19 CTA final

## 1. Identificação
- slug: cta_final · Ordem: 10 · Nível: completo · Âncora: #cta-final

## 2. Função na narrativa
- Último convite à ação antes do footer.
- Papel: ação.

## 3. Conteúdo
- Chave: `secoes.cta_final`
- Itens `validar`: nenhum
- Mídia necessária: foto de pessoas reais, contexto local (ver assets-needed.md)

## 4. Layout
- Referência: cartão flutuante sobre foto (ref. Daniela Soares) — bate com a regra do DS 2.0 de fotografia real
- Hierarquia: headline > subtexto > CTA
- Espaçamento: `--space-section`
- Fundo: foto de fundo + overlay
- O que herdar: cartão flutuante sobre a foto
- O que NÃO copiar: nada específico

## 5. Componentes
- Botão/primário, Mídia (ver `docs/componentes.md`)

## 6. Jornada UX
- Vê: "Vamos resolver isso agora?", foto de pessoas reais, botão grande
- Faz: toca no CTA
- Reage: abre WhatsApp
- Sente: "é hora de agir, não custa nada simular"
- Atrito → mitigação: nenhum — é o último convite, sem informação nova
- Evento: `cta_principal_click` (origem: cta_final)

## 7. Motion
- Nível: N1 · Biblioteca: CSS (botão) + Motion (container, opcional)
- Elementos: Botão — R10 · container — R1 leve
- Desktop/Mobile: reveal simples do cartão ao entrar na viewport
- Reduced-motion: aparece direto

## 8. Mobile
- Botão largo, próximo ao polegar

## 9. Critérios de aceite
- (DoD padrão)
- Foto não é clichê de dinheiro/3D (regra do DS 2.0 — o site não tem mais nenhuma seção 3D, ver `docs/sections/showcase-3d.md`)

## 11. Status
completa
