import Link from "next/link";
import type { Serie } from "@/types/series";
import { PosterPlaceholder } from "@/components/PosterPlaceholder";
import { EstadoBadge } from "@/components/EstadoBadge";
import { Badge } from "@/components/Badge";
import { Calificacion } from "@/components/Calificacion";
import { FavoriteButton } from "@/components/FavoriteButton";

interface SeriesCardProps {
  serie: Serie;
  onToggleFavorito: (id: string) => void;
}

/**
 * Tarjeta de una serie para la grilla de la lista. No tiene hooks propios:
 * solo compone otros componentes y reenvia `onToggleFavorito`, asi que no
 * necesita "use client" (el limite cliente/servidor lo pone quien la usa).
 *
 * El boton de favorito va FUERA del <Link> (como hermano, posicionado
 * encima con `absolute`) para no anidar un <button> dentro de un <a>,
 * que es invalido en HTML y confunde a los lectores de pantalla.
 */
export function SeriesCard({ serie, onToggleFavorito }: SeriesCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <Link href={`/series/${serie.id}`} className="flex flex-1 flex-col">
        <PosterPlaceholder
          titulo={serie.titulo}
          posterUrl={serie.posterUrl}
          className="h-40 w-full"
        />
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="line-clamp-1 font-semibold text-slate-900 dark:text-slate-100">
            {serie.titulo}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5">
            <EstadoBadge estado={serie.estado} />
            {serie.generos.slice(0, 2).map((genero) => (
              <Badge key={genero}>{genero}</Badge>
            ))}
          </div>
          <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
            {serie.sinopsis}
          </p>
          <div className="mt-auto flex items-center justify-between pt-2 text-sm text-slate-500 dark:text-slate-400">
            <span>{serie.anioEstreno}</span>
            <Calificacion valor={serie.calificacion} />
          </div>
        </div>
      </Link>
      <FavoriteButton
        esFavorito={serie.favorito}
        onToggle={() => onToggleFavorito(serie.id)}
        className="absolute right-3 top-3 bg-white/90 shadow dark:bg-slate-900/90"
      />
    </div>
  );
}
