// Formateador APA 7ª
export type RefInput = {
  tipo: string;
  autores: string;
  anio?: number | null;
  titulo: string;
  fuente?: string | null;
  editorial?: string | null;
  url?: string | null;
  doi?: string | null;
};

export function formatAPA(r: RefInput): string {
  const autores = r.autores.trim();
  const anio = r.anio ? `(${r.anio}).` : "(s.f.).";
  const titulo = r.titulo.trim().replace(/\.$/, "");

  switch (r.tipo) {
    case "libro":
      return `${autores} ${anio} ${italic(titulo)}. ${r.editorial ?? ""}`.trim();
    case "articulo":
      return `${autores} ${anio} ${titulo}. ${italic(r.fuente ?? "")}${r.doi ? `. https://doi.org/${r.doi}` : ""}`.trim();
    case "web":
      return `${autores} ${anio} ${italic(titulo)}. ${r.fuente ?? ""}${r.url ? ` ${r.url}` : ""}`.trim();
    case "tesis":
      return `${autores} ${anio} ${italic(titulo)} [Tesis]. ${r.editorial ?? ""}`.trim();
    case "capitulo":
      return `${autores} ${anio} ${titulo}. En ${italic(r.fuente ?? "")} (pp.). ${r.editorial ?? ""}`.trim();
    default:
      return `${autores} ${anio} ${titulo}. ${r.fuente ?? ""}`.trim();
  }
}

function italic(s: string) {
  return s ? `*${s}*` : "";
}
