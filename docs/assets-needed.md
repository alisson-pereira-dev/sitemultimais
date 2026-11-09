# Ativos necessários — MultiMais Negócios

| Ativo | Onde é usado | Situação | Prioridade | Observação |
|---|---|---|---|---|
| Logo (SVG/PNG alta resolução, fundo transparente) | Header, footer, favicon, OG | pendente | bloqueia | versão simplificada para favicon (o selo detalhado não fica legível pequeno) |
| Foto de atendimento/pessoa | Hero | **recebido** (versão final trocada em 2026-11-05) | melhora | `public/images/hero.png` — usada como fundo full-bleed do painel inteiro (não squircle, exceção documentada em `docs/sections/hero.md`). Versão atual: foto real do casal numa praça/coreto, luz natural — sem gráfico/mockup embutido, bate com a regra do DS ("pessoas reais, luz natural, contexto local"). Substituiu a versão anterior (arte com fundo navy/laranja + mockup de celular) |
| Logos de parceiros/instituições (pra carrossel com rolagem automática na Hero) | Hero | pendente | opcional | referência visual trazida pelo cliente; sem logos reais não criamos esse elemento — risco de sinal de confiança inventado |
| 3 fotos do carrossel (pessoas reais) | Vantagens (S03) | **recebido** (2026-11-06) | melhora | `public/images/slide_asce01.jpg`, `slide_asce00.jpg`, `slide_asce03.jpg` — mapeamento foto↔legenda foi escolha minha, não confirmada pelo cliente (ver `docs/sections/vantagens.md`, item 3) |
| 4 ilustrações decorativas (uma por item) | Diferenciais (S05) | **recebido** (2026-11-06/07) | melhora | `public/images/peson_*.png` (prefixo "peson", erro de digitação do cliente no nome dos arquivos — mantido como está, não renomeado) — mapeamento 1:1 por nome de arquivo, sem ambiguidade |
| 6 fotos reais dos serviços | Serviços (S06) | **recebido** (2026-11-07, 2 lotes) | melhora | `public/images/serv_*.jpg` — todos os 6 itens |
| Fotos pra o marquee (foto+palavra, 4 faixas) | Sobre | **recebido** (2026-11-07) | melhora | `public/images/atendimento_human_01.jpg` a `_05.jpg` — pool de 5 fotos distribuídas entre as ocorrências do marquee (sem vínculo fixo palavra↔foto) — ver `docs/sections/sobre.md` |
| Foto de pessoas reais (contexto Muritiba) | CTA final | pendente | melhora | regra do DS 2.0: nada de clichê de dinheiro/3D decorativo (o site não tem mais nenhuma seção 3D — ver `docs/sections/showcase-3d.md`) |
| Política de Privacidade / Termos de Uso | Páginas legais | pendente | bloqueia | revisão humana/jurídica obrigatória — é financeira, coleta dado pessoal |
| Domínio e hospedagem | Publicação | pendente | bloqueia | |
| Confirmação de horário completo da semana | Contato, footer | pendente | melhora | só temos quarta-feira confirmada pelo print do Google |
| Confirmação do texto "Sobre" (história real, ano de fundação) | Sobre | pendente | melhora | hoje é texto neutro, marcado `validar` |
| Confirmação das respostas do FAQ | FAQ | pendente | melhora | respostas razoáveis, mas precisam de validação da equipe (documentos exigidos, prazos reais) |
| Tabela de valores/taxas vigente | (não incluída no site ainda) | pendente | bloqueia (se for incluir) | posts do Instagram têm valores que podem estar desatualizados |
| CNPJ / razão social | Footer, termos | pendente | opcional | só necessário se forem citá-lo nos documentos legais |

Prioridade: **bloqueia** (não publica sem isso) · **melhora** (site funciona, mas fica melhor) · **opcional**
Situação: recebido · pendente · placeholder em uso
