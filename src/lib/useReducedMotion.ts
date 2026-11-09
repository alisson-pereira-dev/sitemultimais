"use client";

import { useEffect, useState } from "react";

// motion/react's useReducedMotion() lê matchMedia de forma síncrona no primeiro
// render do cliente, o que diverge do SSR (sem window) e quebra a hidratação para
// quem tem "reduzir movimento" ativado no SO. Esta versão segue o mesmo padrão
// seguro de useIsDesktop: começa em `false` (igual ao servidor) e só atualiza
// depois do mount, via efeito.
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reduced;
}
