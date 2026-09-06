import type { ReactNode } from "react";

/**
 * Pastilla de color generica. No tiene hooks ni eventos, asi que no
 * necesita "use client": funciona igual si un Server Component o un
 * Client Component la renderiza.
 */
interface BadgeProps {
  children: ReactNode;
  tono?: "neutro" | "en-emision" | "finalizada" | "cancelada";
}

const TONOS: Record<NonNullable<BadgeProps["tono"]>, string> = {
  neutro: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  "en-emision":
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  finalizada: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  cancelada: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
};

export function Badge({ children, tono = "neutro" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TONOS[tono]}`}
    >
      {children}
    </span>
  );
}
