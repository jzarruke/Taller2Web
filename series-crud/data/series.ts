import type { Serie } from "@/types/series";

/**
 * Datos semilla: se usan solo la primera vez que la app corre en un
 * navegador (cuando todavia no hay nada en localStorage). De ahi en
 * adelante la fuente de verdad es lo que el usuario tiene guardado.
 */
export const SERIES_INICIALES: Serie[] = [
  {
    id: "s1",
    titulo: "Breaking Bad",
    generos: ["Drama", "Crimen", "Suspenso"],
    anioEstreno: 2008,
    temporadas: 5,
    estado: "finalizada",
    sinopsis:
      "Un profesor de quimica con un diagnostico terminal se asocia con un exalumno para fabricar y vender metanfetamina, y ve como esa decision transforma por completo su vida y su familia.",
    calificacion: 9.5,
    posterUrl: "",
    favorito: true,
    creadoEn: "2024-01-10T10:00:00.000Z",
  },
  {
    id: "s2",
    titulo: "Stranger Things",
    generos: ["Ciencia ficcion", "Terror", "Fantasia"],
    anioEstreno: 2016,
    temporadas: 4,
    estado: "en-emision",
    sinopsis:
      "En un pueblo pequeno de los años 80, un grupo de amigos se enfrenta a experimentos secretos, criaturas de otra dimension y fuerzas sobrenaturales que amenazan su comunidad.",
    calificacion: 8.6,
    posterUrl: "",
    favorito: false,
    creadoEn: "2024-01-11T10:00:00.000Z",
  },
  {
    id: "s3",
    titulo: "The Office",
    generos: ["Comedia"],
    anioEstreno: 2005,
    temporadas: 9,
    estado: "finalizada",
    sinopsis:
      "Un falso documental sobre la vida cotidiana de los empleados de una sucursal de una empresa de papel, con un jefe cuyo mayor deseo es ser querido por todos.",
    calificacion: 8.9,
    posterUrl: "",
    favorito: true,
    creadoEn: "2024-01-12T10:00:00.000Z",
  },
  {
    id: "s4",
    titulo: "Game of Thrones",
    generos: ["Drama", "Fantasia", "Accion"],
    anioEstreno: 2011,
    temporadas: 8,
    estado: "finalizada",
    sinopsis:
      "Varias familias nobles luchan por el control del Trono de Hierro mientras una amenaza ancestral se acerca desde el norte del continente.",
    calificacion: 9.2,
    posterUrl: "",
    favorito: false,
    creadoEn: "2024-01-13T10:00:00.000Z",
  },
  {
    id: "s5",
    titulo: "The Mandalorian",
    generos: ["Ciencia ficcion", "Accion"],
    anioEstreno: 2019,
    temporadas: 3,
    estado: "en-emision",
    sinopsis:
      "Un cazarrecompensas solitario recorre los confines de la galaxia protegiendo a un misterioso niño mientras evita a quienes lo persiguen.",
    calificacion: 8.7,
    posterUrl: "",
    favorito: false,
    creadoEn: "2024-01-14T10:00:00.000Z",
  },
  {
    id: "s6",
    titulo: "Dark",
    generos: ["Ciencia ficcion", "Drama", "Suspenso"],
    anioEstreno: 2017,
    temporadas: 3,
    estado: "finalizada",
    sinopsis:
      "La desaparicion de un niño destapa las conexiones ocultas entre cuatro familias de un pueblo aleman y desencadena un misterio que atraviesa tres generaciones en el tiempo.",
    calificacion: 8.8,
    posterUrl: "",
    favorito: true,
    creadoEn: "2024-01-15T10:00:00.000Z",
  },
  {
    id: "s7",
    titulo: "Friends",
    generos: ["Comedia", "Romance"],
    anioEstreno: 1994,
    temporadas: 10,
    estado: "finalizada",
    sinopsis:
      "Seis amigos treintañeros comparten su vida cotidiana, sus relaciones y su crecimiento personal en la ciudad de Nueva York.",
    calificacion: 8.9,
    posterUrl: "",
    favorito: false,
    creadoEn: "2024-01-16T10:00:00.000Z",
  },
  {
    id: "s8",
    titulo: "The Crown",
    generos: ["Drama"],
    anioEstreno: 2016,
    temporadas: 6,
    estado: "finalizada",
    sinopsis:
      "Una mirada dramatizada al reinado de la reina Isabel II del Reino Unido y a los eventos politicos y personales que marcaron su epoca.",
    calificacion: 8.6,
    posterUrl: "",
    favorito: false,
    creadoEn: "2024-01-17T10:00:00.000Z",
  },
];
