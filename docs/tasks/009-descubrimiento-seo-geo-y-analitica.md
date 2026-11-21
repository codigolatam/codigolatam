# Capa de descubrimiento: SEO, GEO y analítica

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Que el sitio sea encontrable por personas y citable por LLMs: metadatos completos por página, datos estructurados, sitemap, `robots.txt` y `llms.txt`, más la analítica sin cookies que el brief prefiere.

## Dependencias

- `docs/tasks/006-portada.md` y `docs/tasks/008-pagina-acerca.md` — las páginas que los metadatos cubren.

## Entrada

- `BRIEF.md` sección 4.3 (descubrimiento en la era de LLMs: contenido estructurado y extraíble, señales E-E-A-T) y 5.2 requisitos 6 (datos estructurados Organization/WebSite/BreadcrumbList, sitemap, canonical, Open Graph, `robots.txt`, `llms.txt`) y 7 (Cloudflare Web Analytics como primera opción, sin cookies ni costo).
- La integración `@astrojs/sitemap` del stack.

## Resultado esperado

- `astro.config` con `@astrojs/sitemap` y canonical por página.
- Metadatos completos en cada página: título y descripción propios, Open Graph completo, autoría.
- Datos estructurados JSON-LD: `Organization` (el holding) y `WebSite` en la portada, `BreadcrumbList` donde aplique.
- `public/robots.txt` y `public/llms.txt` publicados.
- El beacon de Cloudflare Web Analytics en el layout.

## Criterios de calidad

- `sitemap-index.xml` se genera en el build y cubre todas las páginas.
- Cada página declara canonical, OG completo y descripción propia.
- Los JSON-LD validan (datos estructurados coherentes con la autoría real).
- `robots.txt` y `llms.txt` responden en el sitio publicado.
- La analítica no usa cookies ni pesa en el cliente más que el beacon.

## Procedimiento sugerido

1. Integrar `@astrojs/sitemap` y la base de metadatos por página.
2. Añadir los JSON-LD de Organization/WebSite y BreadcrumbList.
3. Publicar `robots.txt` y redactar `llms.txt`.
4. Insertar el beacon de Web Analytics.

## Notas

- `llms.txt` declara qué es el sitio y a dónde apunta, en la misma voz del brief; es contrato para lectores-LLM, no copia de marketing.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
