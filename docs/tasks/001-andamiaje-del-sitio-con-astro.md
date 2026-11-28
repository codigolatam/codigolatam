# Andamiaje del sitio con Astro

## Estado

[x] Completada

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

## Contexto

- Archivos similares: ninguno dentro del repo; el sitio es greenfield y `site/` todavía no existe. El stack de referencia del holding lo fija `BRIEF.md` §5.1.
- Patrones: convenciones del proyecto en `AGENTS.md` (Conventional Commits en español, sin `CHANGELOG.md`, `DESIGN.md` como contrato de estilo pendiente de la tarea 004). Estructura del repo: el código vive en `site/` y los artefactos de gestión (`BRIEF.md`, `TODO.md`, `docs/`, `.agents/`, `.teleprompter/`) en la raíz, que no se tocan.
- Dominio: ninguno aplica — el proyecto aún no tiene documentación de dominios.
- Producto: ninguno aplica — sin documentación de producto; el comportamiento esperado lo declara `BRIEF.md` §2 (sitio institucional del holding, no un medio) y §5.1–5.2.
- PRD: ninguno aplica — tarea suelta, sin conjunto con PRD.
- Lecciones: ninguna aplica — sin registro de lecciones todavía.
- Decisiones: ninguna aplica — sin registro de decisiones todavía.

## Conectividad

**Conectada.** La tarea no presupone nada del codebase: crea `site/` desde cero y todo lo que necesita —la especificación del stack en `BRIEF.md` §5.1, las convenciones de `AGENTS.md` y un directorio `site/` vacío que no colisiona con nada— existe o la propia tarea lo produce.

## Plan técnico

Subsistema: no existe — se crea. El repo contiene solo artefactos de gestión; el sitio será un paquete npm autocontenido en `site/` (propio `package.json`, `node_modules`, scripts), un proyecto Astro con salida estática y TypeScript estricto para `astro check`. Decisiones transversales: la URL canónica `https://codigolatam.media` vive en un único módulo de datos del que `astro.config` la toma; `src/styles/` queda deliberadamente sin valores de marca (llegan con la tarea 004); sin integraciones Astro todavía (`sitemap` → 009, feeds → 007); el layout nace sin cabecera ni pie de navegación (eso es la 005).

- [x] Inicializar el paquete `site/` con `package.json` (ESM, `engines.node >=22`, privado), `astro.config` con `site:` tomado del módulo de datos y salida estática explícita, y `tsconfig` del preset estricto de Astro
  - Aporta: el esqueleto compilable sobre el que se monta todo lo demás; la configuración canónica queda fijada desde el inicio y no la improvisan las tareas de SEO y despliegue
- [x] Crear la estructura fuente mínima: layout `src/layouts/` con `<html lang="es">`, charset/viewport y slot; página de prueba `src/pages/index.astro` que lo consume; `src/styles/global.css` importado por el layout con solo reset estructural; módulo `src/data/` con nombre, URL canónica y descripción del holding que el layout usa para el `<title>`
  - Aporta: la página de prueba real que exige el resultado esperado, montada sobre el layout que la 005 completará, y un punto único de verdad para los metadatos
- [x] Fijar el runtime: `.nvmrc` en la raíz con `22`, coherente con `engines` del paquete
  - Aporta: la paridad local/remoto de Node que exige el brief para el build de Cloudflare
- [x] Configurar la calidad como contrato: `@astrojs/check` + TypeScript (`check`), ESLint flat config con `eslint-plugin-astro` + `typescript-eslint` + `eslint-config-prettier` (`lint`), Prettier + `prettier-plugin-astro` con `.prettierignore` para `dist/` (`format` y `format:check`), Vitest (`test`), más `dev`, `build`, `preview` y `astro`
  - Aporta: cada criterio de calidad queda ejecutable por un comando, listo para que CI (003) lo consuma
  - Contexto: `format` escribe y `format:check` solo verifica — CI necesita el modo no destructivo
- [x] Añadir la prueba trivial de Vitest sobre el módulo de datos del sitio
  - Aporta: el arnés de test queda ejercido sobre un módulo real, no sobre `expect(true)`
- [x] Crear `site/.gitignore` (`dist/`, `node_modules/`, `.astro/`) sin tocar el de la raíz
  - Aporta: los artefactos generados del paquete quedan fuera de git sin contaminar las reglas del repo
- [x] Verificar de punta a punta: `npm install`, `check`, `lint`, `format:check`, `test`, `build` produce `site/dist/` y `dev` sirve la página
  - Aporta: los criterios de calidad verificados antes de la revisión técnica

## Suite de pruebas esperada

- El módulo de datos del sitio expone nombre «Código LATAM», URL canónica y descripción no vacíos, para que layout y config los consuman (O).
- La URL canónica del módulo es `https://codigolatam.media` —apex, no www— y `astro.config` la toma de él: fuente única (I).
- La descripción institucional no excede ~160 caracteres, pensada para metadatos de descubrimiento (B).

## Revisión

- Subagente: 2026-11-27 — Aprueba
- Usuario (ejecución): 2026-11-27 — Aprueba
- Usuario (cierre): 2026-11-27 — Aprueba
