# Portada

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

La página que cumple el rol del sitio: explica qué es Código LATAM, presenta el portafolio de medios, captura suscriptores del newsletter y muestra los últimos artículos de los medios.

## Dependencias

- `docs/tasks/005-layout-base-y-404.md` — el marco de página.

## Entrada

- `BRIEF.md` sección 2.3 (contenido de la portada), 3 (los cinco proyectos del portafolio con enfoque y audiencia), 4.1 (voz institucional), 4.2 (el viaje del lector entre medios) y 5.3 (formulario desacoplado del proveedor).
- El módulo de datos del directorio de medios de la tarea del layout.

## Resultado esperado

- `index` con: propuesta de valor del holding, el portafolio (nombre, enfoque, audiencia y enlace de cada medio), el formulario de captura del newsletter y la zona de últimos artículos.
- El formulario desacoplado del proveedor: el `action` vive en configuración, cambiar de servicio no toca la página (la herramienta es la decisión 1 del brief, pendiente; el formulario funciona cuando se conecte).
- La zona de artículos lista para recibir la agregación RSS (o renderizada si esa tarea va primero).

## Criterios de calidad

- Un visitante entiende qué es Código LATAM y a qué medio ir en una lectura de la portada.
- Cada medio del portafolio enlaza a su dominio.
- El formulario valida el correo y no depende del proveedor en su estructura.
- Textos en la voz institucional del brief, sin adjetivos que vendan.

## Procedimiento sugerido

1. Redactar el contenido de la portada con la voz institucional (misión, propuesta de valor, portafolio).
2. Construir las secciones consumiendo el módulo de datos de medios.
3. Implementar el formulario con el `action` en configuración.
4. Dejar la zona de artículos preparada para la agregación RSS.

## Notas

- El orden de los medios en el portafolio sigue el viaje del lector del brief (laescalera.dev como ancla, después frontend, después backend).
- Lo que el sitio puede afirmar sobre los medios aún no lanzados es la decisión 5 del brief; el texto los presenta sin prometer lo que no existe.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
