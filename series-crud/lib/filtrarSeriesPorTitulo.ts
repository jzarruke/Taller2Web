import type { Serie } from "@/types/series";

/**
 * Filtra series por titulo, ignorando mayusculas/minusculas y tildes.
 * Es una funcion pura (no toca estado ni el DOM) para poder reutilizarla
 * en cualquier pantalla que necesite buscar por nombre, sin repetir la
 * logica de comparacion en cada una.
 */
export function filtrarSeriesPorTitulo(series: Serie[], termino: string): Serie[] {
  const terminoNormalizado = normalizarTexto(termino.trim());

  if (!terminoNormalizado) {
    return series;
  }

  return series.filter((serie) =>
    normalizarTexto(serie.titulo).includes(terminoNormalizado)
  );
}

// Quita los signos diacriticos (tildes, dieresis, etc.) que "normalize"
// separa como caracteres Unicode combinados (rango U+0300 a U+036F).
const DIACRITICOS = new RegExp("[\\u0300-\\u036f]", "g");

function normalizarTexto(texto: string): string {
  return texto.toLowerCase().normalize("NFD").replace(DIACRITICOS, "");
}
