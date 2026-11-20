# BRIEF — Código LATAM: el sitio del holding

**Para:** equipo de desarrollo y editorial · **Fecha:** 20 nov 2026

En todo el documento, **[Plan]** marca intención aprobada pero no
implementada.

## 1. Qué es Código LATAM

Código LATAM es la holding de medios del ecosistema LATAM 2055, donde
cumple la función de construir audiencia. Su misión: educación y
comunidad para developers hispanohablantes.

El nombre juega con un doble sentido: código como programación y como
sistema de carrera.

Diferenciador editorial: explicar cómo funcionan las cosas por dentro
(mecanismos, trade-offs y límites) en lugar de resolver la tarea del
momento. La documentación dice qué hace una API y los tutoriales
dicen qué pasos seguir; entre ambos falta el espacio que explica por
qué se decide así, qué alternativas había y qué se rompe si se
ignora. Ese juicio, que solo se gana construyendo, es lo que un LLM
no aporta por sí solo.

El sector de publicaciones técnicas en español es todavía pequeño.
La mayoría de los developers en LATAM aprende en inglés no por
preferencia sino por falta de oferta en su idioma, y lo que hay en
español suele ser tutorial de pasos, no pieza para entender. En ese
terreno la audiencia no se disputa: se crea. Cada lector nuevo
agranda la conversación para todos los medios que la escriben y para
todas las personas que la leen.

Por eso Código LATAM no viene a repartirse el espacio sino a sumarse
a él: ser parte del ecosistema de desarrollo, elevar el nivel de la
conversación técnica y darle de leer a quien hoy no tiene dónde
(hasta que leer sobre tecnología en español sea tan natural como lo
es hoy en inglés).

## 2. El sitio

### 2.1 Rol

El sitio es la puerta de entrada pública del holding: explica qué es
Código LATAM, presenta el portafolio de medios y dirige a cada
visitante al medio que le corresponde. También es el punto de captura
de audiencia para todo el ecosistema: el formulario del newsletter del
holding vive aquí.

### 2.2 Audiencia

- Developers hispanohablantes que descubren el ecosistema y necesitan
  orientación hacia su medio.
- Lectores de los medios que buscan entender qué hay detrás y qué más
  existe.
- Aliados y patrocinadores potenciales del ecosistema.

### 2.3 Contenido

- **Portada:** la misión y la propuesta de valor, el portafolio de
  medios (nombre, enfoque, audiencia, enlace), la captura del
  newsletter y los últimos artículos de cada medio, agregados vía RSS.
- **Acerca:** qué es Código LATAM, su rol en el ecosistema LATAM 2055
  y quién lo hace (autoría visible; ver 4.3).
- **Comunidad [Plan]:** qué es el espacio comunitario y cómo entrar
  (ver 5.4).
- **Pie:** enlaces a todos los medios y al ecosistema LATAM 2055.

### 2.4 Límites

El sitio no es un medio más: no publica artículos propios (el
contenido editorial vive en cada medio) ni replica lo que ellos
ofrecen (buscador, series, autores por artículo). Enlaza, no duplica.
Un espacio de «novedades del holding» es **[Plan]** a futuro.

## 3. Portafolio

Lo que el sitio presenta:

| Proyecto | Enfoque | Audiencia |
| --- | --- | --- |
| fronteando.dev | Frontend: arquitectura, fundamentos, mecanismos internos | Devs frontend intermedios |
| porconsola.dev | Backend, DevOps, infraestructura, system design | Devs backend / DevOps |
| laescalera.dev | Carrera: salarios, mercado laboral LATAM, rutas junior→senior, trabajo remoto | Todos los niveles; la audiencia más amplia |
| Código Community | Discord, networking, oportunidades | Lectores de los tres medios |
| Código Pro | Contenido y newsletter premium | Suscriptores de pago |

Orden de lanzamiento previsto **[Plan]** para los medios:
laescalera.dev como ancla, después el medio de frontend y luego el de
backend.

## 4. Para el equipo editorial

### 4.1 Voz institucional

- Español natural de LATAM, con términos técnicos en inglés cuando son
  los que la gente usa.
- Explicar el porqué, no solo el cómo; honestidad sobre costos y
  límites, sin adjetivos que vendan.
- La voz es institucional: representa al holding entero, no la pluma
  de ningún medio.

### 4.2 Viaje del lector [Plan]

Los medios se recorren como una ruta: laescalera.dev (¿qué habilidades
necesito?) → medio de frontend → medio de backend → vuelta a
laescalera.dev (carrera senior). Este sitio hace la ruta visible: cada
medio responde una etapa del camino y la portada enlaza a la
siguiente.

### 4.3 Descubrimiento en la era de LLMs

- Las citas de IA favorecen dominios con autoridad y contenido
  estructurado y extraíble: títulos claros, respuestas directas,
  ejemplos.
- Señales E-E-A-T: quién hace Código LATAM debe ser visible, con
  experiencia demostrada.
- Prioridad a los canales propios (newsletter, RSS de los medios)
  sobre los rentados.

## 5. Para el equipo de desarrollo

### 5.1 Stack y despliegue en Cloudflare Pages

El sitio usa el stack de referencia del holding (la misma base que
luego compartirán los medios): un sitio estático generado con
**Astro**, publicado en **Cloudflare Pages** (worker de assets
estáticos, la plataforma unificada de Cloudflare) con despliegue
continuo por integración Git (Workers Builds). Cada merge a la rama
principal dispara el build y la publicación; cada rama obtiene una URL
de preview.

Componentes del stack:

- **Generador:** Astro con salida estática (build a `dist/`); sin
  servidor ni base de datos que mantener.
- **Runtime de build:** Node 22, fijado con `.nvmrc` para que el
  build remoto use la misma versión que el local.
- **Contenido:** páginas institucionales; si necesitan texto largo,
  en Markdown dentro del repositorio.
- **Integraciones:** `@astrojs/sitemap`; la agregación de artículos
  consume los feeds RSS públicos de cada medio.
- **Fuentes:** servidas localmente vía Fontsource, sin CDN externo.
- **Calidad:** `astro check`, ESLint, Prettier y tests unitarios
  (Vitest); CI corre check, lint, format, build y test en cada PR.

Configuración de despliegue (declarativa, vive en el repositorio):

- `wrangler.jsonc`: nombre del worker (debe coincidir con el proyecto
  del dashboard o el build falla), `assets.directory` apuntando a
  `./dist`, `not_found_handling: "404-page"`, previews por rama con
  URL propia y `routes` con custom domain para `codigolatam.media`
  y `www.codigolatam.media`.
- `wrangler` fijado como dependencia de desarrollo: el despliegue
  remoto y el local usan la misma versión.
- Alta inicial, una sola vez desde el dashboard de Cloudflare:
  conectar el repositorio en Workers & Pages, fijar rama de
  producción, directorio raíz, comando de build `npm run build` y de
  despliegue `npx wrangler deploy`, y añadir el custom domain.

Infraestructura compartida: el sitio no necesita servidor propio. Los
servicios auxiliares que sí lo requieran (newsletter self-hosted, bots
de comunidad, analítica self-hosted) se alojan en Núcleo Abierto, la
capa de infraestructura compartida del ecosistema, fieles a su
filosofía Indie Stack: construir infraestructura reutilizable antes
que pagar SaaS cuando sea posible.

### 5.2 Requerimientos del sitio

1. **Sistema de marca en tokens CSS:** todo valor visual proviene de
   custom properties declaradas en una guía de estilo; dos temas
   (claro/oscuro) con `prefers-color-scheme` y selector persistente.
   La identidad del holding propuesta es azul Código `#1E40AF` y
   naranja LATAM `#EA580C` (por confirmar; ver decisión 4).
2. **Navegación del ecosistema:** enlaces a todos los medios desde la
   portada y el pie (la función central del sitio).
3. **Newsletter y captura de suscriptores:** canal propio
   prioritario; el formulario va en la portada (ver 5.3).
4. **Autoría:** quién hace Código LATAM, visible en Acerca y en los
   metadatos (E-E-A-T).
5. **Agregación de contenido:** los últimos artículos por medio se
   obtienen de sus feeds RSS (la fuente de verdad es cada medio; el
   sitio no duplica contenido).
6. **SEO/GEO:** datos estructurados (Organization, WebSite,
   BreadcrumbList), sitemap, canonical, Open Graph completo por
   página, `robots.txt` y `llms.txt`.
7. **Analítica con privacidad:** primera opción Cloudflare Web
   Analytics (nativa, sin cookies, sin costo); alternativa Plausible
   self-hosted en la infraestructura compartida.
8. **Rendimiento y accesibilidad como estándar:** sitio estático con
   JS mínimo, «saltar al contenido», foco visible, contraste AA y
   objetivos táctiles ≥44px.
9. **CI:** check, lint, format, build y test en cada PR antes de
   merge.

### 5.3 Newsletter

Servicio desacoplado (Buttondown, MailerLite, Listmonk self-hosted u
otro), integrado por formulario en el sitio. Cambiar de proveedor no
toca el sitio. La membresía premium (Código Pro) es **[Plan]**:
validar audiencia antes de invertir en la capa de pago.

### 5.4 Comunidad [Plan]

Discord con canales por especialidad (`#bienvenida`, `#general`,
`#carreras`, `#frontend`, `#backend`, `#oportunidades`, `#logros`,
`#recursos`, `#codigo-live`) y eventos «Código Live» con office
hours. La página Comunidad del sitio lo presenta y enlaza.

## 6. Decisiones abiertas

| # | Decisión | Responsable sugerido |
| --- | --- | --- |
| 1 | ¿Qué herramienta de newsletter (Buttondown, MailerLite, Listmonk u otra)? | Desarrollo + Editorial |
| 2 | ¿Cuál es el nombre del boletín del holding? | Editorial |
| 3 | Autoría pública: ¿quién firma como responsable del holding? | Editorial |
| 4 | ¿Cuál es el sistema de marca definitivo (tokens y tipografías)? | Ambos |
| 5 | ¿Qué puede afirmar el sitio sobre porconsola.dev y laescalera.dev? | Editorial |
