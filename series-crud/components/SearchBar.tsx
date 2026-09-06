"use client";

interface SearchBarProps {
  valor: string;
  onCambiar: (valor: string) => void;
  placeholder?: string;
}

/**
 * Input de busqueda controlado: no guarda su propio estado, recibe
 * `valor` y avisa los cambios con `onCambiar`. Quien la use (la pagina
 * principal) decide donde vive el termino de busqueda y como filtrar.
 */
export function SearchBar({
  valor,
  onCambiar,
  placeholder = "Buscar series por nombre...",
}: SearchBarProps) {
  return (
    <input
      type="search"
      value={valor}
      onChange={(evento) => onCambiar(evento.target.value)}
      placeholder={placeholder}
      aria-label="Buscar series por nombre"
      className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
    />
  );
}
