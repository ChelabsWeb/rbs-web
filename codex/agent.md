# Agent — Context Coding with Codex

## Objetivo del agente
Orquestar sesiones para construir la nueva web de RBS end-to-end.

## Estructura de sesiones (en orden)
1. `01-ui-shell.md` — crea AppShell, layout, tema Tailwind
2. `02-components-catalog.md` — PosterCard, MovieGrid, etc.
3. `03-cms-integration.md` — data layer (WP REST), tipos y fetchers
4. `04-data-importer.md` — script de ingesta `wp-pull.ts`
5. `05-search-and-filters.md` — búsqueda + filtros
6. `06-seo+og.md` — metadata, schema, OG
7. `07-a11y+perf.md` — accesibilidad + performance
8. `08-ci+cd.md` — GH Actions + Vercel

## Convenciones
- Usa TypeScript, Next App Router, Tailwind
- Componentes en `src/components/*`
- Pages en `app/*`
- Data layer en `src/lib/data/*`
- Tests Vitest + React Testing Library
