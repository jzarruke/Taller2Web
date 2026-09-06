"use client";

import { useRouter } from "next/navigation";
import { useSeries } from "@/context/SeriesContext";
import { SerieForm } from "@/components/SerieForm";
import type { SerieFormData } from "@/types/series";

/**
 * Conecta el formulario compartido con `crearSerie` del contexto. Vive
 * aparte de `app/series/nueva/page.tsx` (que se queda Server Component)
 * porque usar el contexto y el router requiere hooks de cliente.
 */
export function NuevaSerieForm() {
  const { crearSerie } = useSeries();
  const router = useRouter();

  function manejarEnvio(datos: SerieFormData) {
    crearSerie(datos);
    router.push("/");
  }

  return (
    <SerieForm
      alEnviar={manejarEnvio}
      textoBoton="Crear serie"
      reiniciarAlEnviar
    />
  );
}
