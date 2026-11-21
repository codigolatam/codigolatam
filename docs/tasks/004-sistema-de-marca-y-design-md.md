# Sistema de marca y DESIGN.md

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Declarar el sistema visual del holding como contrato verificable: `DESIGN.md` en la raíz con los tokens CSS que materializan la identidad (paleta, tipografía, espaciado), los dos temas (claro/oscuro) con selector persistente y las fuentes servidas localmente.

## Dependencias

- `docs/tasks/001-andamiaje-del-sitio-con-astro.md` — el proyecto donde los tokens se materializan.

## Entrada

- `BRIEF.md` sección 5.2 requisito 1: todo valor visual proviene de custom properties declaradas en una guía de estilo; dos temas con `prefers-color-scheme` y selector persistente; fuentes vía Fontsource; la identidad propuesta es azul Código `#1E40AF` y naranja LATAM `#EA580C` (por confirmar en la decisión 4 del brief).
- Los skills `documentar-guia-estilo` (produce `DESIGN.md` en diálogo) y `aplicar-guia-estilo` (verifica que el código la cumple).

## Resultado esperado

- `DESIGN.md` en la raíz: el contrato de la guía de estilo (paleta con roles semánticos, tipografía, espaciado, radios, temas).
- Los tokens como custom properties en `site/src/styles/`, con variantes por tema y soporte de `prefers-color-scheme`.
- Selector de tema persistente (elección del usuario guardada y respetada en visitas siguientes).
- Fuentes instaladas vía Fontsource, sin CDN externo.

## Criterios de calidad

- Todo valor visual de las páginas existentes proviene de tokens: ningún literal de color, tipografía o espaciado en componentes.
- El selector de tema persiste entre visitas y respeta `prefers-color-scheme` por defecto.
- Contraste AA en ambos temas.
- Las fuentes se sirven localmente (sin peticiones a CDN en el build).

## Procedimiento sugerido

1. Producir `DESIGN.md` con `documentar-guia-estilo` en diálogo con el usuario (la paleta propuesta del brief como punto de partida, abierta a la decisión 4).
2. Materializar los tokens en custom properties con las variantes de tema.
3. Instalar las fuentes con Fontsource y declararlas en los tokens.
4. Implementar el selector persistente y aplicar los tokens en la página de prueba.

## Notas

- La paleta queda abierta a la decisión 4 del brief: un cambio posterior se hace en los tokens, no en los componentes.
- La voz de la guía es la del proyecto: reglas declarativas, sin historia de construcción.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
