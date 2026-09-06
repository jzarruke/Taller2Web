"use client";

import { useState, type FormEvent } from "react";
import {
  ESTADOS_SERIE,
  GENEROS_DISPONIBLES,
  LIMITES_SERIE,
  SERIE_FORM_DATA_INICIAL,
  type SerieFormData,
} from "@/types/series";
import { validarSerie, formularioValido } from "@/lib/validarSerie";

interface SerieFormProps {
  /** Valores con los que arranca el formulario (para editar). Si no se
   * pasa, arranca vacio (para crear). */
  valoresIniciales?: SerieFormData;
  alEnviar: (datos: SerieFormData) => void;
  textoBoton?: string;
  /** Solo tiene sentido en el formulario de crear: limpia los campos
   * despues de un envio exitoso, para poder agregar otra serie. */
  reiniciarAlEnviar?: boolean;
}

type CamposTocados = Partial<Record<keyof SerieFormData, boolean>>;

const claseInput =
  "border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";
const claseLabel =
  "text-sm font-medium text-slate-700 dark:text-slate-300";
const claseError = "text-sm text-red-600 dark:text-red-400";

/**
 * Formulario controlado de serie, compartido por crear y editar. Toda la
 * validacion pasa por `validarSerie` (una sola vez, no duplicada entre
 * los dos usos) y corre en cada render, asi que los errores se actualizan
 * en tiempo real a medida que se escribe.
 */
export function SerieForm({
  valoresIniciales = SERIE_FORM_DATA_INICIAL,
  alEnviar,
  textoBoton = "Guardar",
  reiniciarAlEnviar = false,
}: SerieFormProps) {
  const [valores, setValores] = useState<SerieFormData>(valoresIniciales);
  const [tocados, setTocados] = useState<CamposTocados>({});
  const [intentoEnviar, setIntentoEnviar] = useState(false);

  const errores = validarSerie(valores);

  function mostrarError(campo: keyof SerieFormData): string | undefined {
    if (!tocados[campo] && !intentoEnviar) {
      return undefined;
    }
    return errores[campo];
  }

  function marcarTocado(campo: keyof SerieFormData) {
    setTocados((previos) => ({ ...previos, [campo]: true }));
  }

  function alCambiarGenero(genero: string, marcado: boolean) {
    setValores((previos) => ({
      ...previos,
      generos: marcado
        ? [...previos.generos, genero]
        : previos.generos.filter((g) => g !== genero),
    }));
  }

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setIntentoEnviar(true);

    if (!formularioValido(validarSerie(valores))) {
      return;
    }

    alEnviar(valores);

    if (reiniciarAlEnviar) {
      setValores(SERIE_FORM_DATA_INICIAL);
      setTocados({});
      setIntentoEnviar(false);
    }
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="titulo" className={claseLabel}>
          Titulo
        </label>
        <input
          id="titulo"
          type="text"
          value={valores.titulo}
          onChange={(evento) =>
            setValores((previos) => ({ ...previos, titulo: evento.target.value }))
          }
          onBlur={() => marcarTocado("titulo")}
          className={claseInput}
        />
        {mostrarError("titulo") && (
          <p className={claseError}>{mostrarError("titulo")}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className={claseLabel}>Generos</span>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {GENEROS_DISPONIBLES.map((genero) => (
            <label
              key={genero}
              className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400"
            >
              <input
                type="checkbox"
                checked={valores.generos.includes(genero)}
                onChange={(evento) => alCambiarGenero(genero, evento.target.checked)}
                onBlur={() => marcarTocado("generos")}
              />
              {genero}
            </label>
          ))}
        </div>
        {mostrarError("generos") && (
          <p className={claseError}>{mostrarError("generos")}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="anioEstreno" className={claseLabel}>
            Año de estreno
          </label>
          <input
            id="anioEstreno"
            type="number"
            value={valores.anioEstreno}
            onChange={(evento) =>
              setValores((previos) => ({
                ...previos,
                anioEstreno: Number(evento.target.value),
              }))
            }
            onBlur={() => marcarTocado("anioEstreno")}
            min={LIMITES_SERIE.anioMinimo}
            max={LIMITES_SERIE.anioMaximo}
            className={claseInput}
          />
          {mostrarError("anioEstreno") && (
            <p className={claseError}>{mostrarError("anioEstreno")}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="temporadas" className={claseLabel}>
            Temporadas
          </label>
          <input
            id="temporadas"
            type="number"
            value={valores.temporadas}
            onChange={(evento) =>
              setValores((previos) => ({
                ...previos,
                temporadas: Number(evento.target.value),
              }))
            }
            onBlur={() => marcarTocado("temporadas")}
            min={LIMITES_SERIE.temporadasMinimo}
            max={LIMITES_SERIE.temporadasMaximo}
            className={claseInput}
          />
          {mostrarError("temporadas") && (
            <p className={claseError}>{mostrarError("temporadas")}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="estado" className={claseLabel}>
            Estado
          </label>
          <select
            id="estado"
            value={valores.estado}
            onChange={(evento) =>
              setValores((previos) => ({
                ...previos,
                // El value de un <select> siempre es texto; lo forzamos al
                // tipo EstadoSerie porque las opciones vienen de ESTADOS_SERIE,
                // el mismo arreglo que define ese tipo.
                estado: evento.target.value as SerieFormData["estado"],
              }))
            }
            className={claseInput}
          >
            {ESTADOS_SERIE.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="calificacion" className={claseLabel}>
            Calificacion (0-10)
          </label>
          <input
            id="calificacion"
            type="number"
            step={0.1}
            value={valores.calificacion}
            onChange={(evento) =>
              setValores((previos) => ({
                ...previos,
                calificacion: Number(evento.target.value),
              }))
            }
            onBlur={() => marcarTocado("calificacion")}
            min={LIMITES_SERIE.calificacionMinima}
            max={LIMITES_SERIE.calificacionMaxima}
            className={claseInput}
          />
          {mostrarError("calificacion") && (
            <p className={claseError}>{mostrarError("calificacion")}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="posterUrl" className={claseLabel}>
          URL del poster (opcional)
        </label>
        <input
          id="posterUrl"
          type="text"
          value={valores.posterUrl ?? ""}
          onChange={(evento) =>
            setValores((previos) => ({ ...previos, posterUrl: evento.target.value }))
          }
          placeholder="https://..."
          className={claseInput}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="sinopsis" className={claseLabel}>
          Sinopsis
        </label>
        <textarea
          id="sinopsis"
          rows={4}
          value={valores.sinopsis}
          onChange={(evento) =>
            setValores((previos) => ({ ...previos, sinopsis: evento.target.value }))
          }
          onBlur={() => marcarTocado("sinopsis")}
          className={claseInput}
        />
        {mostrarError("sinopsis") && (
          <p className={claseError}>{mostrarError("sinopsis")}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
        >
          {textoBoton}
        </button>
      </div>
    </form>
  );
}
