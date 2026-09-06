import { Badge } from "@/components/Badge";
import { ESTADOS_SERIE, type EstadoSerie } from "@/types/series";

/**
 * Traduce un `EstadoSerie` a su etiqueta en español. Centraliza esa
 * traduccion aqui para no repetirla en la tarjeta, el detalle y el
 * formulario.
 */
interface EstadoBadgeProps {
  estado: EstadoSerie;
}

export function EstadoBadge({ estado }: EstadoBadgeProps) {
  const opcion = ESTADOS_SERIE.find((item) => item.value === estado);
  return <Badge>{opcion?.label ?? estado}</Badge>;
}
