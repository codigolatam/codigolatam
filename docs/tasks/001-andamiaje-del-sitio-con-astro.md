# Andamiaje del sitio con Astro

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Dejar el esqueleto compilable del sitio del holding: un proyecto Astro en `site/` que produce HTML estático, con las herramientas de calidad configuradas y listo para recibir el sistema de marca y el contenido de las páginas.

## Dependencias

- Ninguna

## Entrada

- `BRIEF.md` sección 5.1: Astro con salida estática a `dist/`, Node 22 fijado con `.nvmrc`, calidad con `astro check`, ESLint, Prettier y Vitest.
- El directorio `site/` como hogar del código del sitio, separado de los artefactos de gestión del proyecto que ocupan la raíz (`BRIEF.md`, `TODO.md`, `docs/`, `.agents/`).

## Resultado esperado

- Proyecto Astro inicializado en `site/` con la estructura de un sitio institucional: `src/pages/`, layout base mínimo y `src/styles/`.
- `.nvmrc` en la raíz con Node 22.
- Scripts funcionando: `npm run dev`, `npm run build`, `npm run check` (astro check), `npm run lint`, `npm run format`, `npm test` (Vitest).
- Una página de prueba que renderiza y servirá de banco para el sistema de marca.
- `.gitignore` del sitio (`dist/`, `node_modules/`) sin tocar el de la raíz.

## Criterios de calidad

- `npm run build` termina sin errores y produce `site/dist/`.
- `npm run dev` sirve una página accesible en local.
- `npm run check`, `npm run lint` y `npm run format` pasan limpios; `npm test` corre aunque sea un test trivial.
- Los artefactos de gestión del proyecto quedan intactos en la raíz.

## Procedimiento sugerido

1. Inicializar el proyecto Astro en `site/` con la plantilla mínima.
2. Configurar `astro.config` con `site: 'https://codigolatam.media'` y salida estática.
3. Crear el layout base mínimo y una página de prueba.
4. Añadir `.nvmrc`, dependencias de calidad y scripts; configurar ESLint, Prettier y Vitest.
5. Verificar dev, check, lint, format, test y build de punta a punta.

## Notas

- Sin integraciones todavía: `@astrojs/sitemap` y el manejo de feeds llegan con sus tareas.
- Sin sistema de marca ni contenido real: la página de prueba es solo el banco de trabajo.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
