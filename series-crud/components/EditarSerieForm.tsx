"use client";

import { useRouter } from "next/navigation";
import { useSeries } from "@/context/SeriesContext";
import { SerieForm } from "@/components/SerieForm";
import type { Serie, SerieFormData } from "@/types/series";

interface EditarSerieFormProps {
  id: string;
}

function aDatosDeFormulario(serie: Serie): SerieFormData {
  return {
    titulo: serie.titulo,
    generos: serie.generos,
    anioEstreno: serie.anioEstreno,
    temporadas: serie.temporadas,
    estado: serie.estado,
    sinopsis: serie.sinopsis,
    calificacion: serie.calificacion,
    posterUrl: serie.posterUrl,
  };
}

/**
 * Busca la serie por id en el contexto y, cuando ya esta disponible,
 * muestra el formulario compartido pre-llenado. Mientras el contexto
 * todavia esta hidratando desde localStorage, o si el id no existe,
 * muestra el estado correspondiente en vez del formulario.
 */
export function EditarSerieForm({ id }: EditarSerieFormProps) {
  const { obtenerSeriePorId, actualizarSerie, cargando } = useSeries();
  const router = useRouter();
  const serie = obtenerSeriePorId(id);

  if (cargando) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Cargando...
      </p>
    );
  }

  if (!serie) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        No encontramos esa serie. Puede que ya la hayan eliminado.
      </p>
    );
  }

  function manejarEnvio(datos: SerieFormData) {
    actualizarSerie(id, datos);
    router.push("/");
  }

  return (
    <SerieForm
      valoresIniciales={aDatosDeFormulario(serie)}
      alEnviar={manejarEnvio}
      textoBoton="Guardar cambios"
    />
  );
}
