import raw from "../../content/content.json";
import type { Content } from "./content.types";

type AnyRecord = Record<string, unknown>;

function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as AnyRecord)) {
      return (acc as AnyRecord)[key];
    }
    return undefined;
  }, obj);
}

// content.json uses "@algum.caminho" para referenciar valores de `site`
// (evita duplicar WhatsApp, telefone, CTAs, etc.). Resolve recursivamente.
function resolveRefs(value: unknown): unknown {
  if (typeof value === "string" && value.startsWith("@")) {
    return resolveRefs(getPath((raw as AnyRecord).site, value.slice(1)));
  }
  if (Array.isArray(value)) {
    return value.map(resolveRefs);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as AnyRecord).map(([key, v]) => [key, resolveRefs(v)])
    );
  }
  return value;
}

export const content: Content = resolveRefs(raw) as Content;

export function isPendente(valor: string | undefined | null): boolean {
  return !valor || valor === "pendente";
}
