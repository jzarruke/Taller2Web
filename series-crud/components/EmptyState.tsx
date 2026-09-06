interface EmptyStateProps {
  titulo: string;
  descripcion?: string;
}

/** Estado vacio reutilizable: sin series, sin resultados de busqueda, etc. */
export function EmptyState({ titulo, descripcion }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 px-6 py-16 text-center dark:border-slate-700">
      <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
        {titulo}
      </p>
      {descripcion && (
        <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
          {descripcion}
        </p>
      )}
    </div>
  );
}
