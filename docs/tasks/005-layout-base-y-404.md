# Layout base, navegación del ecosistema y 404

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

El marco de todas las páginas del sitio: cabecera con la marca del holding y la navegación del ecosistema (la función central del sitio: enrutar al visitante hacia su medio), pie como directorio completo, y la página 404 que el despliegue exige.

## Dependencias

- `docs/tasks/004-sistema-de-marca-y-design-md.md` — los tokens que la interfaz consume.

## Entrada

- `BRIEF.md` sección 2.3 (pie con enlaces a todos los medios y al ecosistema LATAM 2055), sección 5.2 requisito 2 (navegación del ecosistema desde la portada y el pie) y requisito 8 («saltar al contenido», foco visible, contraste AA, objetivos táctiles ≥44px, JS mínimo).
- `not_found_handling: "404-page"` de la configuración de despliegue, que exige una página 404.

## Resultado esperado

- Layout base con cabecera (marca del holding + navegación a las páginas del sitio y a los medios), `<main>` con «saltar al contenido» y pie con el directorio completo del ecosistema.
- Página 404 en la estética del sitio.
- La navegación funciona con el JS mínimo posible (idealmente ninguno).

## Criterios de calidad

- Todos los medios del portafolio son alcanzables desde el pie en toda página.
- «Saltar al contenido» lleva al contenido principal; el foco es visible en toda la navegación por teclado.
- Contraste AA en ambos temas y objetivos táctiles de al menos 44px.
- La 404 responde bajo `not_found_handling` en el despliegue.

## Procedimiento sugerido

1. Construir el layout con cabecera y pie consumiendo los tokens de `DESIGN.md`.
2. Añadir el enlace «saltar al contenido» y los estados de foco.
3. Crear la página 404.
4. Verificar la navegación por teclado en ambos temas.

## Notas

- Los datos del directorio (nombre, enfoque, audiencia, URL de cada medio) se repiten en la portada: conviene definirlos una vez en un módulo de datos del sitio y consumirlos desde ambos lugares.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
