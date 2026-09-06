import Link from "next/link";
import type { Metadata } from "next";
import { SerieDetalle } from "@/components/SerieDetalle";

export const metadata: Metadata = {
  title: "Detalle de la serie",
};

/**
 * Server Component: extrae el `id` de la ruta dinamica (Promise en
 * Next.js 16) y se lo pasa al detalle de cliente. El titulo de la
 * pestaña se queda generico porque los datos de la serie solo existen
 * en localStorage del navegador, no en el servidor.
 */
export default async function DetalleSeriePagina(
  props: PageProps<"/series/[id]">
) {
  const { id } = await props.params;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="text-sm text-slate-500 hover:underline dark:text-slate-400"
      >
        ← Volver
      </Link>
      <SerieDetalle id={id} />
    </main>
  );
}
