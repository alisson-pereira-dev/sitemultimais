# Jornada UX — MultiMais Negócios

## Macro
| Estágio | Seções | Objetivo | Sinal de sucesso |
|---|---|---|---|
| Descoberta | Header, Hero | "É pra mim? Resolve meu problema?" | Continua rolando |
| Interesse | Vantagens, Reveal, Diferenciais, Serviços, Showcase 3D | "Fácil, seguro, tudo num lugar só" | Chega a 50% do scroll |
| Confiança | Como funciona, Sobre | "Dá pra confiar, parece simples" | Rola até o fim do "Como funciona" |
| Decisão | FAQ, Contato | "Tiraram minha dúvida, sei onde ficam" | Abre uma pergunta do FAQ |
| Ação | CTA final, CTA flutuante | "Vou falar agora" | Clica no WhatsApp |

## CTA principal
Onde aparece: Header (sempre visível) · Hero · Como funciona (fim) · CTA final · CTA flutuante (mobile, todo o scroll). Destino: abre WhatsApp com mensagem pré-preenchida (`site.contato.whatsapp.mensagem_padrao`).

## Micro (por seção)

### S00 Header
Vê logo/menu/CTA sempre visível → rola a página, ou toca no hambúrguer → fundo transparente vira branco com sombra ao rolar; menu abre com foco preso → "o contato está sempre à mão". Evento: `cta_principal_click` (origem: header) — *documentado, não implementado*.

### S01 Hero
Vê headline + foto + CTA duplo → toca no botão → abre WhatsApp pronto → "é simples, é rápido, é aqui em Muritiba". Atrito: foto lenta não deve travar o CTA (texto/CTA não dependem da imagem pro LCP). Evento: `cta_principal_click` (origem: hero).

### S03 Vantagens (substituiu "Problema" em 2026-11-06)
Vê a etiqueta "A gente sabe como é" + uma fila de cards (1 em destaque, mais largo, com título; os outros só com um selo de ícone) → clica na seta, num card recolhido, ou arrasta (swipe) pra girar a fila → o destaque muda, largura reorganiza com animação suave → "fácil, rápido, seguro, tudo num lugar só". 3 conteúdos ditados pelo cliente, não genéricos.

### S03B Reveal (nova, 2026-11-07)
Rola → o fundo navy "gruda" na tela e revela um título grande ("A vida não espera o dinheiro aparecer", a frase que antes vivia em Vantagens) que deriva bem devagar enquanto a seção atravessa a tela → a seção seguinte sobe e cobre de novo → pausa/ênfase antes dos diferenciais. Sem interação, só leitura.

### S05 Diferenciais
Vê 4 motivos → rola → reveal escalonado → "não é só mais uma financeira genérica". Atrito: claims sem prova numérica — mitigado mantendo como discurso da marca, sem comparação falsa.

### S06 Serviços
Vê carrossel com 6 serviços → arrasta/toca → cards deslizam, toque pode levar ao WhatsApp já mencionando o serviço → "fazem exatamente o que eu preciso". Indicação visual de "tem mais" no corte da última imagem. Evento: `servico_click`.

### S07 Como funciona
Vê painel navy com 4 passos numerados → rola → cada passo revela ao entrar na viewport → "não é complicado, são só 4 passos". Evento: `cta_principal_click` (origem: como_funciona).
*(Seção "Transforme seu limite", Card 3D, removida em 2026-11-07 a pedido do cliente — Como funciona assumiu este lugar na página. Ver `docs/sections/showcase-3d.md`.)*

### S04 Sobre
Vê 4 faixas de foto+palavra rolando sem parar, formando "Atendimento humanizado de pessoa pra pessoa." → rola → sensação de movimento constante → "tem gente de verdade por trás disso". Atrito: frase ainda provisória (`validar`), sem foto real ainda — melhora quando o cliente confirmar/enviar.

### S16 FAQ
Vê "Dúvidas frequentes", CTA fixo à esquerda + lista à direita → toca numa pergunta → accordion expande → "resolveram minha última dúvida antes de eu decidir". Atrito: respostas marcadas `validar` — equipe confirma documentos/prazos reais. Evento: `faq_open`.

### S17 Contato
Vê endereço, horário, botões grandes → toca em WhatsApp/ligar/rota → abre o app direto → "sei exatamente onde ficam". Mapa carrega só ao tocar (performance). Evento: `whatsapp_click` (origem: contato).

### S19 CTA final
Vê "Vamos resolver isso agora?", foto real, botão grande → toca → abre WhatsApp → "é hora de agir". Evento: `cta_principal_click` (origem: cta_final).

### S23 Footer
Vê contato, links legais, copyright → toca em link se precisar → navega → "é um negócio sério, tem política de privacidade".

### CTA flutuante (mobile)
Vê botão circular fixo → toca a qualquer momento → abre WhatsApp. Some quando o CTA do header está visível. Evento: `cta_principal_click` (origem: flutuante).

## Mapa de eventos (analytics) — documentado, não implementado
| Evento | Gatilho | Seção | Parâmetros |
|---|---|---|---|
| cta_principal_click | clique no CTA principal | qualquer | origem (header/hero/como_funciona/cta_final/flutuante) |
| servico_click | toque em card de serviço | serviços | nome do serviço |
| faq_open | abertura de pergunta | faq | pergunta |
| whatsapp_click | clique WhatsApp fora do CTA principal | contato | origem |
| scroll_depth | 25/50/75/100% | site | — |

*Nenhuma ferramenta de analytics foi definida para este projeto (decisão explícita do cliente) — esses eventos ficam documentados para ativação futura, se desejado.*
