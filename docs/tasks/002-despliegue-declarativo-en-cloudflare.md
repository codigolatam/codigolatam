# Despliegue declarativo en Cloudflare

## Estado

[~] En progreso

## Tipo

desarrollo

## Objetivo

Dejar el sitio publicado en Cloudflare Pages (worker de assets estáticos) con integración Git: la configuración declarativa en el repositorio, el alta única del proyecto en el dashboard y el custom domain activo.

## Dependencias

- `docs/tasks/001-andamiaje-del-sitio-con-astro.md` — el build que el worker publica.

## Entrada

- `BRIEF.md` sección 5.1: `wrangler.jsonc` con nombre del worker, `assets.directory`, `not_found_handling: "404-page"`, previews por rama y `routes` con custom domain para `codigolatam.media` y `www.codigolatam.media`; `wrangler` fijado como dependencia de desarrollo.

## Resultado esperado

- `wrangler.jsonc` en la raíz con el nombre del worker, `assets.directory` apuntando a `./site/dist`, `not_found_handling: "404-page"` y `routes` para `codigolatam.media` y `www.codigolatam.media`.
- `wrangler` fijado como dependencia de desarrollo y script `deploy` (`npx wrangler deploy`).
- El proyecto dado de alta en el dashboard de Cloudflare (paso humano, una sola vez): repositorio conectado en Workers & Pages, rama de producción `main`, comando de build `npm run build` y de despliegue `npx wrangler deploy`.
- `codigolatam.media` y `www.codigolatam.media` respondiendo con el sitio; las ramas obtienen URL de preview.

## Criterios de calidad

- `npx wrangler deploy --dry-run` valida la configuración sin errores.
- `routes` incluye apex y `www`.
- El nombre del worker coincide con el proyecto del dashboard.
- Un merge a `main` dispara el build y la publicación; una rama obtiene su URL de preview.

## Procedimiento sugerido

1. Crear `wrangler.jsonc` en la raíz con la configuración del brief.
2. Añadir `wrangler` como dependencia de desarrollo fijada y el script `deploy`.
3. Verificar con `wrangler deploy --dry-run`.
4. Paso humano en el dashboard: conectar el repositorio en Workers & Pages, fijar rama de producción `main`, comandos de build (`npm run build`, con `site/` como directorio raíz del proyecto) y de despliegue (`npx wrangler deploy`), y añadir el custom domain.
5. Verificar la publicación de `main` y una URL de preview de rama.

## Notas

- El paso 4 exige acceso al dashboard de Cloudflare: lo ejecuta el usuario, no el agente.
- El nombre del worker se acuerda al ejecutar y debe coincidir con el proyecto del dashboard o el build falla.
- La página 404 que `not_found_handling` exige queda cubierta por la tarea del layout; si esta tarea se ejecuta antes, basta una 404 mínima.

## Contexto

- Archivos similares: ninguno en el repo — `wrangler.jsonc` es pieza nueva. El build que el worker publica sí existe: `site/` con `npm run build` → `site/dist` (tarea 001).
- Patrones: `BRIEF.md` §5.1 fija el contenido del config — nombre del worker, `assets.directory`, `not_found_handling: "404-page"`, previews por rama, `routes` con custom domain apex y www, `wrangler` fijado como dependencia de desarrollo — y el alta única en el dashboard. Regla de `AGENTS.md`: el código se escribe en inglés — los comentarios del jsonc van en inglés. El paquete `site/` es autocontenido: wrangler es dependencia suya y el config convive con el proyecto que despliega.
- Entorno: wrangler autenticado con OAuth en la cuenta de Cloudflare — el agente puede desplegar y verificar. La zona `codigolatam.media` ya está añadida a la cuenta de Cloudflare; los nameservers públicos siguen en Namecheap — la activación espera el cambio de nameservers, paso humano en el registrador.
- Prueba de concepto ejecutada durante la planeación: un deploy real de worker de assets sube y publica correctamente; con la zona fuera de la cuenta el attach de custom domain falla con código 100117 y **exit 1**; con la zona ya en la cuenta el attach de apex y www como custom domain **se completa con exit 0** aunque los nameservers aún no apunten a Cloudflare — los builds no fallan por la migración pendiente —; sin rutas activas ni `workers_dev` el worker no tiene target público; el patrón routes+zona+`custom_domain` responde 200 en producción cuando la zona está activa.
- Dominio: ninguno aplica — sin documentación de dominios todavía.
- Producto: ninguno aplica — sin documentación de producto todavía.
- PRD: ninguno aplica — tarea suelta.
- Lecciones: ninguna aplica — sin registro de lecciones.
- Decisiones: ninguna aplica — sin registro de decisiones.

## Conectividad

**Parcialmente conectada.** El núcleo desplegable está verificado empíricamente: build existente, wrangler autenticado, deploy de assets y attach de custom domain funcionando con la zona ya en la cuenta. Lo que falta —el cambio de nameservers en el registrador para activar la zona y el alta del proyecto en el dashboard— es trabajo humano de consola que la propia tarea declara en su alcance (paso 4 del procedimiento), no una capacidad ausente del codebase.

## Plan técnico

Subsistema: la configuración de despliegue no existe — se crea. El build que publica sí existe (`site/` → `dist/`). La prueba de concepto ya verificó el shape exacto del config contra la API real: attach de ambos custom domains con exit 0. Decisión transversal aprobada: `wrangler.jsonc` vive en `site/` junto al proyecto que despliega — coherente con el brief (`./dist`) y con el dashboard, cuyo directorio raíz del proyecto es `site/` — y no en la raíz del repo como sugería el resultado esperado.

- [ ] Añadir la página 404 mínima (`site/src/pages/404.astro`) sobre el layout base
  - Aporta: el asset que `not_found_handling: "404-page"` exige existe desde el primer deploy; la 404 diseñada llega con la tarea 005
- [ ] Crear `site/wrangler.jsonc` final: `name: "codigolatam"`, `compatibility_date`, `assets.directory: "./dist"` con `not_found_handling: "404-page"`, `previews: {}` + `preview_urls: true`, y `routes` para apex y `www` con `zone_name` y `custom_domain`; comentarios en inglés (regla de `AGENTS.md`)
  - Aporta: el estado declarativo final del despliegue, versionado; es exactamente el shape que la prueba de concepto verificó con exit 0
  - Contexto: el nombre `codigolatam` debe coincidir con el proyecto del dashboard — es el dato que el alta humana no puede improvisar
- [ ] Fijar `wrangler` como devDependency de `site/` (`^4.151.0`, la versión con la que corrió la prueba) y añadir el script `deploy`
  - Aporta: la paridad local/remoto de la herramienta de despliegue que exige el brief
- [ ] Añadir el test de contrato del config a la suite Vitest: parsea `wrangler.jsonc` y verifica assets, `not_found_handling` y las rutas contra la URL canónica del módulo de datos
  - Aporta: la coherencia config↔fuente única queda guardada contra regresiones — cierra además la observación de la revisión de la tarea 001 sobre la URL hardcodeada
- [ ] Verificar sin tocar producción: batería completa + `npm run build` produce `dist/index.html` y `dist/404.html` + `npx wrangler deploy --dry-run` válido
  - Aporta: los criterios de calidad verificados; el deploy real no se ejecuta contra el nombre `codigolatam` para que el alta del dashboard cree el proyecto limpio

## Suite de pruebas esperada

- La configuración declara `assets.directory` coherente con el build (`./dist`) y `not_found_handling` `404-page` (O).
- Las `routes` cubren apex y `www` como custom domain de la zona `codigolatam.media`, y el apex coincide con el host de la URL canónica del módulo de datos (I).
- El nombre del worker es `codigolatam`, el mismo que recibirá el alta en el dashboard (I).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
