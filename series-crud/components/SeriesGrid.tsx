import type { Serie } from "@/types/series";
import { SeriesCard } from "@/components/SeriesCard";
import { EmptyState } from "@/components/EmptyState";

interface SeriesGridProps {
  series: Serie[];
  onToggleFavorito: (id: string) => void;
  tituloVacio: string;
  descripcionVacia?: string;
}

/**
 * Grilla de tarjetas. Centraliza el caso "no hay series que mostrar" (sea
 * porque no hay ninguna creada o porque la busqueda no encontro nada) para
 * no repetir ese chequeo en cada pagina que la use.
 */
export function SeriesGrid({
  series,
  onToggleFavorito,
  tituloVacio,
  descripcionVacia,
}: SeriesGridProps) {
  if (series.length === 0) {
    return <EmptyState titulo={tituloVacio} descripcion={descripcionVacia} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {series.map((serie) => (
        <SeriesCard
          key={serie.id}
          serie={serie}
          onToggleFavorito={onToggleFavorito}
        />
      ))}
    </div>
  );
}
