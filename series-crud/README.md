# Series CRUD

Aplicacion de CRUD de series de television hecha con Next.js (App Router),
TypeScript, React y Tailwind CSS. Permite ver, buscar, crear, editar y
eliminar series, y marcarlas como favoritas. Todo se guarda en el
localStorage del navegador, asi que los cambios sobreviven a recargar la
pagina.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

## Instalacion y ejecucion

Requiere Node.js 20.9+ y pnpm.

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

Otros scripts disponibles:

```bash
pnpm build   # build de produccion
pnpm start   # sirve el build de produccion
pnpm lint    # eslint
```

## Funcionalidades

- Listado de series con busqueda por nombre en tiempo real.
- Ver el detalle completo de una serie.
- Crear series con un formulario validado.
- Editar series existentes (formulario pre-llenado).
- Eliminar series con dialogo de confirmacion.
- Marcar/desmarcar series como favoritas.
- Persistencia en localStorage: lo creado, editado, eliminado y los
  favoritos sobreviven a recargar la pagina.
- Loading skeleton mientras se hidratan los datos guardados.
- Manejo de errores (por ejemplo, si localStorage esta bloqueado o los
  datos guardados estan corruptos).
- Diseño responsive.

## Estructura del proyecto

```
types/       Modelo de datos (interfaz Serie, tipos del formulario, limites de validacion)
data/        Datos semilla (solo se usan la primera vez, antes de que exista algo en localStorage)
lib/         Funciones puras: acceso seguro a localStorage, generacion de ids,
             validacion del formulario, filtrado por titulo
context/     SeriesContext: estado compartido (series, cargando, error) y las
             operaciones crearSerie/actualizarSerie/eliminarSerie/toggleFavorito
components/  Componentes de UI, de los mas pequeños (Badge, Calificacion, FavoriteButton)
             a los que arman una pantalla completa (SeriesExplorer, SerieDetalle, SerieForm)
app/         Rutas (App Router): "/", "/series/nueva", "/series/[id]", "/series/[id]/editar"
```

## Decisiones de diseño

- **Persistencia**: `lib/storage.ts` es el unico lugar del proyecto que
  toca `window.localStorage`, siempre protegido con
  `typeof window !== "undefined"` (ese codigo tambien se evalua en el
  servidor durante el render). Devuelve si la lectura/escritura tuvo
  exito para poder mostrar un error claro en vez de fallar en silencio.
- **Estado compartido**: en vez de repetir `useState` y logica de
  localStorage en cada pagina, todo vive en `SeriesProvider`
  (Context API). La pagina principal, el detalle, crear y editar leen y
  escriben desde el mismo lugar.
- **Server vs Client Components**: `app/layout.tsx` y las paginas en
  `app/` se quedan como Server Components. Solo los componentes que
  realmente necesitan hooks o eventos (`SeriesExplorer`, `SerieForm`,
  `SerieDetalle`, `FavoriteButton`, `ConfirmDialog`, etc.) llevan
  `"use client"`.
- **Validacion**: una sola funcion pura (`lib/validarSerie.ts`) valida
  los datos del formulario, usada tanto al crear como al editar para no
  duplicar las reglas. Corre en cada render, asi que los errores se
  actualizan en tiempo real.
- **Rutas dinamicas**: `params` se recibe como `Promise` (asi funciona
  en Next.js 16) y se resuelve con `await` en las paginas `page.tsx` de
  `/series/[id]` y `/series/[id]/editar`.
