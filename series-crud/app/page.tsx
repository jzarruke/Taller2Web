import Link from "next/link";
import type { Metadata } from "next";
import { SeriesExplorer } from "@/components/SeriesExplorer";

export const metadata: Metadata = {
  title: "Mis series",
  description:
    "Lleva el control de las series que ves: crea, edita, marca favoritas y busca por nombre.",
};

/**
 * Pagina principal. Se queda como Server Component (sin "use client"):
 * solo arma el encabezado estatico y delega toda la interactividad a
 * <SeriesExplorer />.
 */
export default function PaginaInicio() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Mis series
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Busca, marca favoritas y edita cuando quieras.
          </p>
        </div>
        <Link
          href="/series/nueva"
          className="inline-flex items-center justify-center border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
        >
          + Nueva serie
        </Link>
      </header>
      <SeriesExplorer />
    </main>
  );
}
