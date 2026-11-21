# CI de calidad en PRs

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Que cada pull request corra la batería de calidad del sitio antes del merge, para que ningún cambio llegue a `main` sin check, lint, formato, build y tests.

## Dependencias

- `docs/tasks/001-andamiaje-del-sitio-con-astro.md` — los scripts que el workflow invoca.

## Entrada

- `BRIEF.md` sección 5.2 requisito 9: CI corre check, lint, format, build y test en cada PR.
- Los scripts del proyecto en `site/` (`check`, `lint`, `format`, `build`, `test`).

## Resultado esperado

- `.github/workflows/ci.yml`: job que en cada PR hacia `main` instala dependencias de `site/` y corre `npm run check`, `npm run lint`, `npm run format` (en modo verificación), `npm run build` y `npm test`, con Node 22 (la versión de `.nvmrc`).

## Criterios de calidad

- El workflow corre en un PR de prueba y pasa en verde.
- El workflow falla si cualquiera de los cinco pasos falla.
- La versión de Node del workflow es la de `.nvmrc`.

## Procedimiento sugerido

1. Crear `.github/workflows/ci.yml` con `working-directory: site`.
2. Abrir un PR de prueba y verificar que el workflow corre y bloquea en caso de fallo.

## Notas

- El despliegue continuo lo da la integración Git de Cloudflare (Workers Builds), no este workflow: CI solo verifica.
- Sin caché de dependencias al inicio; añadirla solo si el tiempo lo pide.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
