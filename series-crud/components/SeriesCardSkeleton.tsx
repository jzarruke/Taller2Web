/** Placeholder animado con la misma silueta que SeriesCard. */
export function SeriesCardSkeleton() {
  return (
    <div
      className="animate-pulse border border-slate-200 dark:border-slate-800"
      aria-hidden="true"
    >
      <div className="h-32 w-full bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}
