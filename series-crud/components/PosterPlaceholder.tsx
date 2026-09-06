interface PosterPlaceholderProps {
  titulo: string;
  posterUrl?: string;
  className?: string;
}

/**
 * Poster de una serie. Si hay `posterUrl` se muestra la imagen; si no,
 * un bloque de color con la inicial del titulo. No usa `next/image`
 * porque la URL la escribe el usuario libremente en el formulario, y
 * `next/image` exigiria configurar de antemano cada dominio permitido.
 */
export function PosterPlaceholder({
  titulo,
  posterUrl,
  className = "",
}: PosterPlaceholderProps) {
  if (posterUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={posterUrl}
        alt={`Poster de ${titulo}`}
        className={`object-cover ${className}`}
      />
    );
  }

  const inicial = titulo.trim().charAt(0).toUpperCase() || "?";
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-semibold text-white ${className}`}
      aria-hidden="true"
    >
      {inicial}
    </div>
  );
}
