"use client";

interface FavoriteButtonProps {
  esFavorito: boolean;
  onToggle: () => void;
  className?: string;
}

/**
 * Boton de favorito. Es "tonto": no sabe nada de localStorage ni del
 * contexto, solo recibe el estado actual y avisa cuando lo tocan. Quien
 * lo use decide que hacer (normalmente llamar a `toggleFavorito` del
 * contexto de series).
 */
export function FavoriteButton({
  esFavorito,
  onToggle,
  className = "",
}: FavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={esFavorito}
      aria-label={esFavorito ? "Quitar de favoritos" : "Marcar como favorito"}
      className={`flex h-9 w-9 items-center justify-center rounded-full border text-lg transition-colors ${
        esFavorito
          ? "border-amber-400 bg-amber-50 text-amber-500 dark:border-amber-500 dark:bg-amber-900/30"
          : "border-slate-300 bg-white text-slate-400 hover:text-amber-500 dark:border-slate-700 dark:bg-slate-900"
      } ${className}`}
    >
      <span aria-hidden="true">{esFavorito ? "★" : "☆"}</span>
    </button>
  );
}
