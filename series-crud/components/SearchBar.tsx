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
    <div className="relative">
      <span
        className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400"
        aria-hidden="true"
      >
        🔍
      </span>
      <input
        type="search"
        value={valor}
        onChange={(evento) => onCambiar(evento.target.value)}
        placeholder={placeholder}
        aria-label="Buscar series por nombre"
        className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />
    </div>
  );
}
