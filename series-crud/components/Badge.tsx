import type { ReactNode } from "react";

/**
 * Pastilla de texto simple (sin colores por tipo): un borde y texto gris.
 * No tiene hooks ni eventos, asi que no necesita "use client".
 */
interface BadgeProps {
  children: ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded border border-slate-300 px-2 py-0.5 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">
      {children}
    </span>
  );
}
