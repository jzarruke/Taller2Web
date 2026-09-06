"use client";

interface FavoriteButtonProps {
  esFavorito: boolean;
  onToggle: () => void;
  className?: string;
}

/**
 * Boton de favorito, simple: solo la estrella, sin fondo ni borde.
 * Es "tonto": no sabe nada de localStorage ni del contexto, solo recibe
 * el estado actual y avisa cuando lo tocan.
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
      className={`flex h-8 w-8 items-center justify-center text-xl ${
        esFavorito ? "text-amber-500" : "text-slate-400 hover:text-amber-500"
      } ${className}`}
    >
      <span aria-hidden="true">{esFavorito ? "★" : "☆"}</span>
    </button>
  );
}
