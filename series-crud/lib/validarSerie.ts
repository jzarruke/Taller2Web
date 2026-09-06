import {
  LIMITES_SERIE,
  type SerieFormData,
  type SerieFormErrors,
} from "@/types/series";

/**
 * Valida los datos del formulario de una serie. Es una funcion pura: no
 * toca el DOM ni el estado, solo recibe datos y devuelve los errores
 * encontrados (objeto vacio si todo esta bien). La usa el formulario
 * compartido de crear/editar, y corre en cada cambio para dar
 * validacion en tiempo real sin duplicar las reglas en dos lugares.
 */
export function validarSerie(datos: SerieFormData): SerieFormErrors {
  const errores: SerieFormErrors = {};

  const titulo = datos.titulo.trim();
  if (titulo.length < LIMITES_SERIE.tituloMinLength) {
    errores.titulo = "El titulo es obligatorio.";
  } else if (titulo.length > LIMITES_SERIE.tituloMaxLength) {
    errores.titulo = `El titulo no puede tener mas de ${LIMITES_SERIE.tituloMaxLength} caracteres.`;
  }

  if (datos.generos.length === 0) {
    errores.generos = "Selecciona al menos un genero.";
  }

  if (
    !Number.isInteger(datos.anioEstreno) ||
    datos.anioEstreno < LIMITES_SERIE.anioMinimo ||
    datos.anioEstreno > LIMITES_SERIE.anioMaximo
  ) {
    errores.anioEstreno = `El año debe estar entre ${LIMITES_SERIE.anioMinimo} y ${LIMITES_SERIE.anioMaximo}.`;
  }

  if (
    !Number.isInteger(datos.temporadas) ||
    datos.temporadas < LIMITES_SERIE.temporadasMinimo ||
    datos.temporadas > LIMITES_SERIE.temporadasMaximo
  ) {
    errores.temporadas = `Las temporadas deben estar entre ${LIMITES_SERIE.temporadasMinimo} y ${LIMITES_SERIE.temporadasMaximo}.`;
  }

  const sinopsis = datos.sinopsis.trim();
  if (sinopsis.length < LIMITES_SERIE.sinopsisMinLength) {
    errores.sinopsis = `La sinopsis debe tener al menos ${LIMITES_SERIE.sinopsisMinLength} caracteres.`;
  } else if (sinopsis.length > LIMITES_SERIE.sinopsisMaxLength) {
    errores.sinopsis = `La sinopsis no puede tener mas de ${LIMITES_SERIE.sinopsisMaxLength} caracteres.`;
  }

  if (
    Number.isNaN(datos.calificacion) ||
    datos.calificacion < LIMITES_SERIE.calificacionMinima ||
    datos.calificacion > LIMITES_SERIE.calificacionMaxima
  ) {
    errores.calificacion = `La calificacion debe estar entre ${LIMITES_SERIE.calificacionMinima} y ${LIMITES_SERIE.calificacionMaxima}.`;
  }

  return errores;
}

export function formularioValido(errores: SerieFormErrors): boolean {
  return Object.keys(errores).length === 0;
}
