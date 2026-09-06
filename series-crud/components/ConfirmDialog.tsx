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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-titulo"
        aria-describedby="confirm-dialog-mensaje"
        className="w-full max-w-sm border border-slate-300 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
      >
        <h2
          id="confirm-dialog-titulo"
          className="font-medium text-slate-900 dark:text-slate-100"
        >
          {titulo}
        </h2>
        <p
          id="confirm-dialog-mensaje"
          className="mt-2 text-sm text-slate-600 dark:text-slate-400"
        >
          {mensaje}
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancelar}
            className="border border-slate-300 px-3 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-300"
          >
            {textoCancelar}
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className={`px-3 py-1.5 text-sm text-white ${
              peligroso ? "bg-red-600" : "bg-slate-900"
            }`}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}
