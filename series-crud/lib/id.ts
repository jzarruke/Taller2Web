/**
 * Genera un identificador unico para una nueva serie.
 *
 * Usa `crypto.randomUUID` cuando esta disponible (navegadores modernos y
 * Node en entorno seguro) y cae a un id basado en timestamp + numero
 * aleatorio como respaldo, para no depender de una sola API.
 */
export function generarId(prefijo = "serie"): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${prefijo}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
