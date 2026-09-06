interface CalificacionProps {
  valor: number;
  className?: string;
}

/** Muestra la calificacion de una serie sobre 10, con una estrella. */
export function Calificacion({ valor, className = "" }: CalificacionProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400 ${className}`}
      aria-label={`Calificacion: ${valor} de 10`}
    >
      <span aria-hidden="true">★</span>
      {valor.toFixed(1)}
    </span>
  );
}
