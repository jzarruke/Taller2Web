import { SeriesCardSkeleton } from "@/components/SeriesCardSkeleton";

interface SeriesGridSkeletonProps {
  cantidad?: number;
}

/** Grilla de skeletons: se usa mientras `cargando` es true en el contexto. */
export function SeriesGridSkeleton({ cantidad = 8 }: SeriesGridSkeletonProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      role="status"
      aria-label="Cargando series"
    >
      {Array.from({ length: cantidad }).map((_, indice) => (
        <SeriesCardSkeleton key={indice} />
      ))}
    </div>
  );
}
