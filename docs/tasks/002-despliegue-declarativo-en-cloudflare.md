# Despliegue declarativo en Cloudflare

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
