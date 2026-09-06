import Link from "next/link";
import type { Metadata } from "next";
import { NuevaSerieForm } from "@/components/NuevaSerieForm";

export const metadata: Metadata = {
  title: "Nueva serie",
};

/** Server Component: solo arma el encabezado y delega el formulario. */
export default function NuevaSeriePagina() {
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
          Nueva serie
        </h1>
      </div>
      <NuevaSerieForm />
    </main>
  );
}
