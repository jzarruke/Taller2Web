"use client";

interface ErrorBannerProps {
  mensaje: string;
  onCerrar?: () => void;
}

/** Banner de error con boton opcional para descartarlo. */
export function ErrorBanner({ mensaje, onCerrar }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="flex items-start justify-between gap-4 border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
    >
      <p>{mensaje}</p>
      {onCerrar && (
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar mensaje de error"
          className="shrink-0 underline"
        >
          Cerrar
        </button>
      )}
    </div>
  );
}
