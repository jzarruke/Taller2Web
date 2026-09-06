/**
 * Modelo de datos central de la aplicacion.
 *
 * `Serie` es la forma "completa" de una serie tal como vive en el estado
 * de la app y en localStorage. `SerieFormData` es el subconjunto de campos
 * que el usuario diligencia en el formulario de creacion/edicion: no incluye
 * `id` (lo genera la app), `favorito` (se controla desde la lista/detalle)
 * ni `creadoEn` (se calcula al crear el registro).
 */

export type EstadoSerie = "en-emision" | "finalizada" | "cancelada";

export interface Serie {
  id: string;
  titulo: string;
  generos: string[];
  anioEstreno: number;
  temporadas: number;
  estado: EstadoSerie;
  sinopsis: string;
  calificacion: number;
  /** URL de poster opcional; si no hay, la UI muestra un placeholder. */
  posterUrl?: string;
  favorito: boolean;
  /** Fecha ISO de creacion del registro, util para ordenar. */
  creadoEn: string;
}

export type SerieFormData = Omit<Serie, "id" | "favorito" | "creadoEn">;

export type SerieFormErrors = Partial<Record<keyof SerieFormData, string>>;

export interface OpcionEstado {
  value: EstadoSerie;
  label: string;
}

export const ESTADOS_SERIE: OpcionEstado[] = [
  { value: "en-emision", label: "En emision" },
  { value: "finalizada", label: "Finalizada" },
  { value: "cancelada", label: "Cancelada" },
];

export const GENEROS_DISPONIBLES = [
  "Drama",
  "Comedia",
  "Ciencia ficcion",
  "Fantasia",
  "Crimen",
  "Suspenso",
  "Animacion",
  "Terror",
  "Accion",
  "Romance",
  "Documental",
] as const;

export type Genero = (typeof GENEROS_DISPONIBLES)[number];

/** Limites usados tanto por la validacion del formulario como por los inputs. */
export const LIMITES_SERIE = {
  anioMinimo: 1928,
  anioMaximo: new Date().getFullYear() + 1,
  temporadasMinimo: 1,
  temporadasMaximo: 100,
  calificacionMinima: 0,
  calificacionMaxima: 10,
  tituloMinLength: 1,
  tituloMaxLength: 100,
  sinopsisMinLength: 10,
  sinopsisMaxLength: 1000,
} as const;

/** Objeto "vacio" util para inicializar el formulario en modo creacion. */
export const SERIE_FORM_DATA_INICIAL: SerieFormData = {
  titulo: "",
  generos: [],
  anioEstreno: new Date().getFullYear(),
  temporadas: 1,
  estado: "en-emision",
  sinopsis: "",
  calificacion: 0,
  posterUrl: "",
};
