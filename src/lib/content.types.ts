export interface Cta {
  texto: string;
  destino: string;
  tipo: "whatsapp" | "telefone";
}

export interface MenuItem {
  rotulo: string;
  destino: string;
}

export interface Media {
  src: string;
  alt: string;
  /** dimensões reais do arquivo — opcional; usado só onde a proporção varia
   * de imagem pra imagem (ex.: ilustrações decorativas dos cards) e o
   * next/image precisa da proporção certa pra não esticar/achatar */
  width?: number;
  height?: number;
}

export interface Endereco {
  logradouro: string;
  cidade: string;
  uf: string;
  cep: string;
  plus_code: string;
  lat: number;
  lng: number;
  mapa_url: string;
}

export interface Horario {
  dias: string;
  horas: string;
  validar?: boolean;
}

export interface Contato {
  whatsapp: { numero: string; mensagem_padrao: string };
  telefone: string;
  email: string;
  endereco: Endereco;
  horarios: Horario[];
}

export interface Site {
  nome: string;
  slogan: string;
  lang: string;
  dominio: string;
  contato: Contato;
  redes: { instagram: string };
  ctas: { principal: Cta; secundario: Cta };
  menu: MenuItem[];
  logo: Media;
}

export interface SeoHome {
  titulo: string;
  descricao: string;
  og_imagem: Media;
  schema: { tipo: string; campos: { endereco: Endereco; telefone: string } };
}

export interface HeroSection {
  headline: string;
  subheadline: string;
  destaque: string;
  cta: Cta;
  cta_secundario: Cta;
  midia: Media;
}

export interface MetricaItem {
  valor: string;
  descricao: string;
  validar?: boolean;
}

export interface MetricasSection {
  itens: MetricaItem[];
}

export interface VantagemSlide {
  titulo: string;
  legenda: string;
  icone: string;
  midia: Media;
}

export interface VantagensSection {
  subtitulo: string;
  destaque: string;
  slides: VantagemSlide[];
  transicao: string;
  cta: Cta;
}

export interface RevealSection {
  titulo: string;
}

export interface DiferencialItem {
  icone: string;
  titulo: string;
  descricao: string;
  /** opcional — ilustração decorativa no canto do card (só alguns itens têm) */
  imagem?: Media;
}

export interface DiferenciaisSection {
  titulo: string;
  itens: DiferencialItem[];
}

export interface ServicoItem {
  nome: string;
  descricao_curta: string;
  icone: string;
  /** opcional — foto real do serviço (nem todos têm ainda) */
  imagem?: Media;
}

export interface ServicosSection {
  titulo: string;
  subtitulo: string;
  itens: ServicoItem[];
}

export interface PassoItem {
  numero: number;
  titulo: string;
  descricao: string;
}

export interface ComoFuncionaSection {
  titulo: string;
  subtitulo: string;
  passos: PassoItem[];
  cta: Cta;
}

export interface SobreMarqueeItem {
  texto: string;
  /** destaca a palavra em laranja (--color-primary) em vez da cor padrão */
  destaque?: boolean;
}

export interface SobreSection {
  titulo: string;
  itens: SobreMarqueeItem[];
  /** pool de fotos reais pro marquee — distribuídas entre as ocorrências
   * (não há 1 foto fixa por palavra); sem fotos, cada item usa um gradiente
   * de marca (ver Sobre.tsx) */
  fotos?: Media[];
  validar?: boolean;
}

export interface PerguntaItem {
  pergunta: string;
  resposta: string;
  validar?: boolean;
}

export interface FaqSection {
  titulo: string;
  perguntas: PerguntaItem[];
}

export interface ContatoSection {
  titulo: string;
  subtitulo: string;
  whatsapp: Contato["whatsapp"];
  telefone: string;
  endereco: Endereco;
  horarios: Horario[];
}

export interface CtaFinalSection {
  headline: string;
  subtexto: string;
  cta: Cta;
}

export interface FooterColuna {
  titulo: string;
  links: MenuItem[];
}

export interface FooterSection {
  descricao_curta: string;
  colunas: FooterColuna[];
  links_legais: MenuItem[];
  copyright: string;
}

export interface Secoes {
  hero: HeroSection;
  metricas: MetricasSection;
  vantagens: VantagensSection;
  reveal: RevealSection;
  diferenciais: DiferenciaisSection;
  servicos: ServicosSection;
  como_funciona: ComoFuncionaSection;
  sobre: SobreSection;
  faq: FaqSection;
  contato: ContatoSection;
  cta_final: CtaFinalSection;
  footer: FooterSection;
}

export interface Microcopy {
  pagina_404: { titulo: string; texto: string; cta: Cta };
  acessibilidade: { pular_para_conteudo: string; abrir_menu: string; fechar_menu: string };
}

export interface Pendencia {
  caminho: string;
  motivo: string;
}

export interface MetaInfo {
  gerado_em: string;
  versao: string;
  pendencias_validar: Pendencia[];
}

export interface Content {
  site: Site;
  seo: { home: SeoHome };
  secoes: Secoes;
  microcopy: Microcopy;
  meta: MetaInfo;
}
