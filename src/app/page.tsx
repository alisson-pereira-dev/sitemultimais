import { Hero } from "@/components/Hero/Hero";
import { Metricas } from "@/components/Metricas/Metricas";
import { Vantagens } from "@/components/Vantagens/Vantagens";
import { Reveal } from "@/components/Reveal/Reveal";
import { Diferenciais } from "@/components/Diferenciais/Diferenciais";
import { Servicos } from "@/components/Servicos/Servicos";
import { ComoFunciona } from "@/components/ComoFunciona/ComoFunciona";
import { Sobre } from "@/components/Sobre/Sobre";
import { Faq } from "@/components/Faq/Faq";
import { Contato } from "@/components/Contato/Contato";
import { CtaFinal } from "@/components/CtaFinal/CtaFinal";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Hero />
      <Metricas />
      <Vantagens />
      <Reveal />
      <Diferenciais />
      <Servicos />
      <ComoFunciona />
      <Sobre />
      <div className={styles.stack}>
        <Faq />
        <Contato />
        <CtaFinal />
      </div>
    </>
  );
}
