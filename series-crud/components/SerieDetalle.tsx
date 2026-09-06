"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSeries } from "@/context/SeriesContext";
import { PosterPlaceholder } from "@/components/PosterPlaceholder";
import { EstadoBadge } from "@/components/EstadoBadge";
import { Badge } from "@/components/Badge";
import { Calificacion } from "@/components/Calificacion";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ConfirmDialog } from "@/components/ConfirmDialog";

interface SerieDetalleProps {
  id: string;
}

/**
 * Vista completa de una serie: info, favorito, editar y eliminar (con
 * confirmacion). Igual que en el formulario de editar, hay que manejar
 * el estado "todavia cargando desde localStorage" y "no existe".
 */
export function SerieDetalle({ id }: SerieDetalleProps) {
  const { obtenerSeriePorId, cargando, eliminarSerie, toggleFavorito } =
    useSeries();
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
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
      <div className="flex flex-col gap-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No encontramos esa serie. Puede que ya la hayan eliminado.
        </p>
        <Link href="/" className="text-sm underline">
          Volver al listado
        </Link>
      </div>
    );
  }

  function confirmarEliminar() {
    eliminarSerie(id);
    router.push("/");
  }

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <PosterPlaceholder
        titulo={serie.titulo}
        posterUrl={serie.posterUrl}
        className="h-56 w-full sm:w-40 sm:shrink-0"
      />

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {serie.titulo}
          </h1>
          <FavoriteButton
            esFavorito={serie.favorito}
            onToggle={() => toggleFavorito(serie.id)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <EstadoBadge estado={serie.estado} />
          {serie.generos.map((genero) => (
            <Badge key={genero}>{genero}</Badge>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span>{serie.anioEstreno}</span>
          <span>
            {serie.temporadas}{" "}
            {serie.temporadas === 1 ? "temporada" : "temporadas"}
          </span>
          <Calificacion valor={serie.calificacion} />
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300">
          {serie.sinopsis}
        </p>

        <div className="mt-2 flex gap-2">
          <Link
            href={`/series/${serie.id}/editar`}
            className="border border-slate-300 px-4 py-2 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-300"
          >
            Editar
          </Link>
          <button
            type="button"
            onClick={() => setDialogoAbierto(true)}
            className="border border-red-600 px-4 py-2 text-sm text-red-600 dark:border-red-500 dark:text-red-500"
          >
            Eliminar
          </button>
        </div>
      </div>

      <ConfirmDialog
        abierto={dialogoAbierto}
        titulo="Eliminar serie"
        mensaje={`¿Seguro que quieres eliminar "${serie.titulo}"? Esta accion no se puede deshacer.`}
        textoConfirmar="Eliminar"
        peligroso
        onConfirmar={confirmarEliminar}
        onCancelar={() => setDialogoAbierto(false)}
      />
    </div>
  );
}
