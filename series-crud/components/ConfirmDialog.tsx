"use client";

import { useEffect } from "react";

interface ConfirmDialogProps {
  abierto: boolean;
  titulo: string;
  mensaje: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  /** Cambia el boton de confirmar a rojo, para acciones destructivas. */
  peligroso?: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
}

/**
 * Dialogo de confirmacion generico (se usa para "¿eliminar esta serie?",
 * pero no sabe nada de series: solo titulo/mensaje/callbacks).
 */
export function ConfirmDialog({
  abierto,
  titulo,
  mensaje,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  peligroso = false,
  onConfirmar,
  onCancelar,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!abierto) {
      return;
    }

    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        onCancelar();
      }
    }

    window.addEventListener("keydown", alPresionarTecla);
    return () => window.removeEventListener("keydown", alPresionarTecla);
  }, [abierto, onCancelar]);

  if (!abierto) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-titulo"
        aria-describedby="confirm-dialog-mensaje"
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900"
      >
        <h2
          id="confirm-dialog-titulo"
          className="text-lg font-semibold text-slate-900 dark:text-slate-100"
        >
          {titulo}
        </h2>
        <p
          id="confirm-dialog-mensaje"
          className="mt-2 text-sm text-slate-600 dark:text-slate-400"
        >
          {mensaje}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {textoCancelar}
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
              peligroso
                ? "bg-red-600 hover:bg-red-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}
