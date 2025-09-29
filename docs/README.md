# RBS — Modernización Web (Context Coding con Codex)

**Objetivo:** rediseñar rbs.com.uy con una UI moderna, veloz y accesible, manteniendo la lógica editorial por distribuidora/estado (Cartelera / Próximamente) y sumando búsqueda, fichas ricas, calendario de estrenos y un mini-presskit por película.

## Tech stack (propuesta)
- **Next.js 14** (App Router) + **React 18**
- **TailwindCSS** + diseño “glass-cinema” (oscuro, acentos neón)
- **Headless WordPress** (WP actual como CMS vía REST) o **Strapi/Sanity** (Plan B)
- **Algolia** (o Meilisearch) para búsqueda
- **Vercel** para hosting, **PlanetScale/Supabase** si precisamos DB auxiliar
- **Cloudflare Images / Imgix** para optimización de afiches y backdrops

> La web actual divide catálogo por estudio y estado y navega con Inicio/Quiénes Somos/Cine/Licencias/Contacto + newsletter. Lo mantenemos y ampliamos. [Ver notas](/docs/sitemap.md).

## Roadmap (alto nivel)
1. UI shell + layout responsivo
2. Componentes base y tipografías
3. Modelado de contenido + ingestión desde WP
4. Listas por estudio/estado y detalle de película
5. Búsqueda + filtros (género/estudio/estado/fecha estreno)
6. SEO, Open Graph, datos estructurados
7. Pruebas, accesibilidad y performance
8. CI/CD y despliegue a Vercel

## Estructura de carpetas
- `docs/` documentación viva
- `codex/agent.md` orquesta sesiones de Codex (context programming)
- `codex/prompts/` prompts atómicos por módulo

## Flujo de trabajo con ramas
- `main` (estable) → `release/*`
- `design/*` → UI/estilos
- `feat/*` → features (ej: `feat/search`, `feat/movie-page`)
- `chore/*`, `fix/*`

Sigue las instrucciones de `/codex/agent.md` para iniciar.
