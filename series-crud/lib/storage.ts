/**
 * Acceso centralizado y "seguro" a localStorage.
 *
 * Estas dos funciones son las UNICAS del proyecto que tocan
 * `window.localStorage` directamente. Ambas verifican
 * `typeof window !== "undefined"` antes de usarlo, porque en Next.js
 * (App Router) este codigo tambien se evalua en el servidor durante el
 * render, donde `window` no existe. Cualquier componente o contexto que
 * necesite persistir algo debe pasar por aqui, en vez de llamar a
 * `localStorage` por su cuenta.
 */

export interface ResultadoLecturaStorage<T> {
  valor: T;
  huboError: boolean;
}

/**
 * Lee y parsea una clave de localStorage.
 * - En el servidor (sin `window`) devuelve el valor por defecto sin error.
 * - Si la clave no existe todavia, tambien devuelve el valor por defecto.
 * - Si el contenido guardado esta corrupto (JSON invalido) o el navegador
 *   bloquea el acceso (modo privado, permisos, etc.), devuelve el valor
 *   por defecto y marca `huboError: true` para que quien llama pueda
 *   avisarle al usuario.
 */
export function leerDeLocalStorage<T>(
  key: string,
  valorPorDefecto: T
): ResultadoLecturaStorage<T> {
  if (typeof window === "undefined") {
    return { valor: valorPorDefecto, huboError: false };
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      return { valor: valorPorDefecto, huboError: false };
    }
    return { valor: JSON.parse(raw) as T, huboError: false };
  } catch (error) {
    console.error(`[storage] No se pudo leer "${key}" de localStorage:`, error);
    return { valor: valorPorDefecto, huboError: true };
  }
}

/**
 * Serializa y guarda un valor en localStorage.
 * Devuelve `true` si se guardo con exito y `false` si no fue posible
 * (sin `window`, cuota excedida, almacenamiento deshabilitado, etc.).
 */
export function guardarEnLocalStorage<T>(key: string, valor: T): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.error(`[storage] No se pudo guardar "${key}" en localStorage:`, error);
    return false;
  }
}

/** Clave usada para guardar el arreglo de series. */
export const SERIES_STORAGE_KEY = "series-crud:series";
