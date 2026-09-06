"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Serie, SerieFormData } from "@/types/series";
import { SERIES_INICIALES } from "@/data/series";
import { generarId } from "@/lib/id";
import {
  SERIES_STORAGE_KEY,
  guardarEnLocalStorage,
  leerDeLocalStorage,
} from "@/lib/storage";

/**
 * Estado y operaciones sobre series, compartidos por toda la app.
 *
 * Esto vive en un Context (en vez de useState repetido en cada pagina)
 * porque la lista, el detalle, crear y editar necesitan los mismos datos
 * y las mismas operaciones (crear, actualizar, eliminar, favoritos): sin
 * esto, cada pagina tendria que leer/escribir localStorage por su cuenta
 * y quedarian desincronizadas entre si.
 */
interface SeriesContextValue {
  series: Serie[];
  /** true mientras se esta leyendo el estado guardado en el navegador. */
  cargando: boolean;
  /** Mensaje de error para mostrar al usuario, o null si no hay ninguno. */
  error: string | null;
  crearSerie: (datos: SerieFormData) => Serie;
  actualizarSerie: (id: string, datos: SerieFormData) => void;
  eliminarSerie: (id: string) => void;
  toggleFavorito: (id: string) => void;
  obtenerSeriePorId: (id: string) => Serie | undefined;
  limpiarError: () => void;
}

const SeriesContext = createContext<SeriesContextValue | null>(null);

interface SeriesProviderProps {
  children: ReactNode;
}

export function SeriesProvider({ children }: SeriesProviderProps) {
  // Arranca con los datos semilla para que el primer render en el
  // servidor y el primer render en el cliente coincidan (si aqui ya
  // intentaramos leer localStorage, el servidor y el cliente
  // producirian HTML distinto y React marcaria un error de hidratacion).
  const [series, setSeries] = useState<Serie[]>(SERIES_INICIALES);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hidratacion: se ejecuta una sola vez, ya en el cliente (los efectos
  // nunca corren en el servidor), justo despues del primer render.
  useEffect(() => {
    const resultado = leerDeLocalStorage<Serie[] | null>(
      SERIES_STORAGE_KEY,
      null
    );

    if (resultado.huboError) {
      setError(
        "No se pudieron leer tus series guardadas en este navegador. Se muestran datos de ejemplo."
      );
    } else if (resultado.valor) {
      setSeries(resultado.valor);
    }

    setCargando(false);
  }, []);

  // Todas las mutaciones pasan por aqui: calculan el nuevo arreglo y lo
  // guardan en el mismo paso. Evita tener un efecto separado del tipo
  // "guardar cada vez que cambie `series`", que tambien se dispararia
  // durante la hidratacion inicial y podria sobreescribir por un
  // instante lo que ya estaba guardado.
  const actualizarYGuardar = useCallback(
    (actualizador: (previas: Serie[]) => Serie[]) => {
      setSeries((previas) => {
        const nuevas = actualizador(previas);
        const seGuardo = guardarEnLocalStorage(SERIES_STORAGE_KEY, nuevas);
        if (!seGuardo) {
          setError(
            "No se pudieron guardar los cambios en este navegador. Es posible que se pierdan al recargar la pagina."
          );
        }
        return nuevas;
      });
    },
    []
  );

  const crearSerie = useCallback(
    (datos: SerieFormData): Serie => {
      const nuevaSerie: Serie = {
        ...datos,
        id: generarId(),
        favorito: false,
        creadoEn: new Date().toISOString(),
      };
      actualizarYGuardar((previas) => [nuevaSerie, ...previas]);
      return nuevaSerie;
    },
    [actualizarYGuardar]
  );

  const actualizarSerie = useCallback(
    (id: string, datos: SerieFormData) => {
      actualizarYGuardar((previas) =>
        previas.map((serie) =>
          serie.id === id ? { ...serie, ...datos } : serie
        )
      );
    },
    [actualizarYGuardar]
  );

  const eliminarSerie = useCallback(
    (id: string) => {
      actualizarYGuardar((previas) => previas.filter((serie) => serie.id !== id));
    },
    [actualizarYGuardar]
  );

  const toggleFavorito = useCallback(
    (id: string) => {
      actualizarYGuardar((previas) =>
        previas.map((serie) =>
          serie.id === id ? { ...serie, favorito: !serie.favorito } : serie
        )
      );
    },
    [actualizarYGuardar]
  );

  const obtenerSeriePorId = useCallback(
    (id: string) => series.find((serie) => serie.id === id),
    [series]
  );

  const limpiarError = useCallback(() => setError(null), []);

  const value = useMemo<SeriesContextValue>(
    () => ({
      series,
      cargando,
      error,
      crearSerie,
      actualizarSerie,
      eliminarSerie,
      toggleFavorito,
      obtenerSeriePorId,
      limpiarError,
    }),
    [
      series,
      cargando,
      error,
      crearSerie,
      actualizarSerie,
      eliminarSerie,
      toggleFavorito,
      obtenerSeriePorId,
      limpiarError,
    ]
  );

  return (
    <SeriesContext.Provider value={value}>{children}</SeriesContext.Provider>
  );
}

/** Hook para consumir el contexto desde cualquier Client Component. */
export function useSeries(): SeriesContextValue {
  const context = useContext(SeriesContext);
  if (!context) {
    throw new Error("useSeries debe usarse dentro de un <SeriesProvider>");
  }
  return context;
}
