"use client";

import { useMemo, useState } from "react";
import { useSeries } from "@/context/SeriesContext";
import { SearchBar } from "@/components/SearchBar";
import { SeriesGrid } from "@/components/SeriesGrid";
import { SeriesGridSkeleton } from "@/components/SeriesGridSkeleton";
import { ErrorBanner } from "@/components/ErrorBanner";
import { filtrarSeriesPorTitulo } from "@/lib/filtrarSeriesPorTitulo";

/**
 * Pieza interactiva de la pagina principal: busqueda + grilla + loading +
 * errores. Vive aparte de `app/page.tsx` (que se queda como Server
 * Component) porque todo esto depende de hooks (useState, el contexto).
 */
export function SeriesExplorer() {
  const { series, cargando, error, toggleFavorito, limpiarError } =
    useSeries();
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const seriesFiltradas = useMemo(
    () => filtrarSeriesPorTitulo(series, terminoBusqueda),
    [series, terminoBusqueda]
  );

  const hayBusqueda = terminoBusqueda.trim().length > 0;

  return (
    <div className="flex flex-col gap-4">
      {error && <ErrorBanner mensaje={error} onCerrar={limpiarError} />}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:max-w-sm sm:flex-1">
          <SearchBar valor={terminoBusqueda} onCambiar={setTerminoBusqueda} />
        </div>
        {!cargando && (
          <p className="whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
            {seriesFiltradas.length}{" "}
            {seriesFiltradas.length === 1 ? "serie" : "series"}
          </p>
        )}
      </div>

      {cargando ? (
        <SeriesGridSkeleton />
      ) : (
        <SeriesGrid
          series={seriesFiltradas}
          onToggleFavorito={toggleFavorito}
          tituloVacio={
            hayBusqueda
              ? "No encontramos series con ese nombre"
              : "Todavia no has agregado series"
          }
          descripcionVacia={
            hayBusqueda
              ? "Intenta con otra palabra o revisa la ortografia."
              : 'Usa el boton "Nueva serie" para agregar la primera.'
          }
        />
      )}
    </div>
  );
}
