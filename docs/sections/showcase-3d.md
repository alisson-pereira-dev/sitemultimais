# Ficha — S08 Transforme seu limite (Card 3D) — REMOVIDA

**2026-11-07:** seção removida a pedido do cliente ("remova o card 3d e o que diz respeito a isso de limite de cartao nesta seção"). O lugar dela na página foi assumido pela seção **Como funciona** redesenhada (fundo navy, painel recuado com cantos arredondados) — ver `docs/sections/como-funciona.md`. Componente (`src/components/Showcase3d/`), chave de conteúdo (`secoes.showcase_3d`) e as dependências `@react-three/fiber`/`three` (só usadas aqui) foram removidos do código. Resolve de quebra a pendência de marca registrada abaixo (fotos com logo de outro banco) — deixou de existir junto com a seção. Ficha original preservada abaixo só como histórico.

---

## Ficha original (histórico, não reflete o que está no ar)

## 1. Identificação
- slug: showcase_3d · Ordem: 5 · Nível: completo · Âncora: #transforme

## 2. Função na narrativa
- Tornar tangível, de forma interativa, o serviço de transformar limite do cartão em dinheiro — o "wow" do site, ligado a um serviço real.
- Papel: interesse/confiança.

## 3. Conteúdo
- Chave: `secoes.showcase_3d`
- Itens `validar`: nenhum
- Mídia: `public/images/3d_card_frente.png` / `3d_card_verso.png` (1000×658, recebidas do cliente em 2026-11-07) — usadas como textura real do cartão (frente/verso) no lugar da representação abstrata anterior (chip/linhas/anel desenhados em caixas coloridas)
- **⚠️ pendência de marca (bloqueia lançamento):** as duas imagens trazem a marca real de outro banco (logo "Nu"/Nubank + logo Mastercard) impressa na arte. É um placeholder visual puramente técnico pra validar o efeito 3D com uma foto de cartão real em vez de formas abstratas — **não pode ir pra produção assim**. Ver `docs/assets-needed.md`.

## 4. Layout
- Referência: seção isolada, fundo `--color-secondary` (navy) pra destacar do resto
- Estrutura: desktop — texto ao lado da cena; mobile — texto acima, cena abaixo
- Hierarquia: headline > instrução de interação > cena 3D > CTA
- Espaçamento: `--space-section`
- O que herdar: nada de referência externa — componente específico deste projeto
- O que NÃO copiar: não aplicável

## 5. Componentes
- Card 3D interativo, Botão/primário (ver `docs/componentes.md`)

## 6. Jornada UX
- Vê: cartão 3D parado com instrução sutil ("Vire o cartão")
- Faz: arrasta ou toca no cartão
- Reage: cartão gira revelando o valor em dinheiro/PIX do outro lado
- Sente: "literalmente transformam meu limite em dinheiro, entendi na hora"
- Atrito → mitigação: pessoa pode não perceber que é interativo → ícone/texto de instrução + leve balanço de convite nos primeiros segundos, só uma vez
- Evento: `showcase_3d_interact`

## 7. Motion
- Nível: **N3** (único ponto do site além do N2 do Hero com motion elevado — exceção documentada no CLAUDE.md)
- Biblioteca: R3F/Three.js
- Desktop: cartão 3D simples (geometria baixa, 1–2 luzes), gira ao arrastar com o mouse, carregamento tardio (importação dinâmica), fora do caminho do LCP, `poster` estático enquanto carrega
- Mobile: mesma interação por toque/arrasto se passar no teste de performance em dispositivo intermediário; senão, cai para versão 2D (`transform: rotateY`, CSS), mesma interação — decidido por teste de capacidade, não por tamanho de tela
- Reduced-motion: cartão aparece "virado" mostrando os dois estados lado a lado, ou troca instantânea ao toque, sem giro
- Fallback: se WebGL não disponível ou dispositivo fraco, cai pra imagem estática sem erro visível

## 8. Mobile
- Cena 3D mantida (mais simples que a do Hero) se passar no teste de performance; senão, versão 2D (CSS flip)
- Interação por toque: arrasto horizontal vira o cartão
- Texto acima da cena, centralizado

## 9. Critérios de aceite
- (DoD padrão)
- Cena nunca atrasa o LCP (fora da primeira dobra)
- Funciona por toque E teclado (Enter/Espaço vira o cartão)
- Fallback 2D testado e funcional se WebGL indisponível
- Cena pausa/libera recursos fora da viewport

## 10. Notas e decisões
- Nível N3 isolado nesta seção por decisão explícita do cliente ("quero algo em 3D, bem pensado e otimizado, com interação, não decoração"). Candidato a virar padrão reutilizável "Product Showcase 3D" no boilerplate.
- **2026-11-07:** troca das faces do cartão (3D e fallback 2D) pelas fotos reais recebidas do cliente, a pedido explícito ("coloquei frente e verso para vc trocar... deixe maior tbm o 3d"). Textura carregada via `useLoader(THREE.TextureLoader, ...)` do R3F (precisa de `<Suspense>` ao redor da malha, já que `useLoader` suspende o componente até a imagem carregar) com `colorSpace = THREE.SRGBColorSpace` pra cor correta de foto. Geometria da caixa aumentada (`[2.4, 1.5, 0.08]` → `[2.9, 1.9, 0.08]`) e proporção ajustada pra bater com a foto (1000×658 ≈ 1,52, antes 1,6 genérico); container (`.stage`) também aumentado nos dois modos — mobile 340px→380px, desktop 420px→520px — e sua `aspect-ratio` ajustada pra mesma proporção real. Os meshes decorativos (chip dourado, linhas numeradas, anel no verso) e as formas equivalentes do fallback 2D (`.chip`/`.lines`/`.ring`) foram removidos: a foto real já traz esses elementos impressos, mantê-los duplicaria/conflitaria visualmente.
- **Repetindo com destaque (não é só uma nota de rodapé):** as duas fotos atuais mostram o logo real de outro banco. Troca feita como pedido, mas isso precisa ser resolvido com arte própria da MultiMais antes de publicar o site.

## 11. Status
completa
