import Link from "next/link";
import type { Metadata } from "next";
import { EditarSerieForm } from "@/components/EditarSerieForm";

export const metadata: Metadata = {
  title: "Editar serie",
};

/**
 * Server Component: extrae el `id` de la ruta dinamica (en Next.js 16
 * `params` es una Promise) y se lo pasa al formulario de cliente.
 */
export default async function EditarSeriePagina(
  props: PageProps<"/series/[id]/editar">
) {
  const { id } = await props.params;

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <div>
        <Link
          href="/"
          className="text-sm text-slate-500 hover:underline dark:text-slate-400"
        >
          ← Volver
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Editar serie
        </h1>
      </div>
      <EditarSerieForm id={id} />
    </main>
  );
}
