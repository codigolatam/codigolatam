# Agregación de artículos desde los feeds de los medios

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Mostrar en la portada los últimos artículos de cada medio, consumidos de sus feeds RSS públicos: la fuente de verdad es cada medio y el sitio agrega sin duplicar contenido.

## Dependencias

- `docs/tasks/006-portada.md` — la zona de artículos donde se renderiza.

## Entrada

- `BRIEF.md` sección 5.2 requisito 5 (agregación vía feeds RSS; la fuente es cada medio).
- La lista de feeds de los medios en el módulo de datos del directorio (los que existen hoy; los medios aún no lanzados se incorporan solo añadiendo su URL).

## Resultado esperado

- Un módulo que en build obtiene y normaliza los últimos artículos por medio desde su feed (título, fecha, enlace).
- La sección de la portada renderiza los feeds que responden y omite con elegancia a los medios cuyo feed aún no existe (sin huecos ni errores).
- El desfase de un medio ausente no rompe el build: un feed caído degrada su bloque, no la página.

## Criterios de calidad

- La portada muestra los últimos artículos de cada medio con feed activo, con su fecha.
- Un feed inaccesible o inexistente no rompe el build ni deja un bloque vacío visible.
- Añadir un medio nuevo a la agregación es añadir su URL de feed a la configuración, nada más.

## Procedimiento sugerido

1. Implementar la obtención y normalización de feeds en build.
2. Renderizar por medio los últimos artículos en la sección de la portada.
3. Verificar la degradación ante un feed ausente y ante uno caído.

## Notas

- La agregación corre en build (sitio estático): la frescura la da la frecuencia de builds, no JavaScript del cliente.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
