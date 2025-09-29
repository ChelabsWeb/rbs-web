# Git Roadmap — BMAD (Branding → Messaging → Architecture → Design)

> Estrategia: trunk-based con ramas cortas por fase BMAD y features. `main` siempre estable; releases desde tags.

## Nomenclatura de ramas
- Fase BMAD: `branding/*`, `messaging/*`, `architecture/*`, `design/*`
- Feature: `feat/<área>/<detalle>`  (ej: `feat/search/algolia`)
- Fix/chore/docs: `fix/*`, `chore/*`, `docs/*`
- Release: `release/*` (ramas temporales si hace falta estabilizar)

## Convenciones de commits (Conventional Commits)
- `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`
- Ej: `feat(branding): add glass-cinema palette & tokens`

---

## Secuencia sugerida (con entregables)
### 0. Init
- Rama: `init/project`
- Entregables: Next 14 + TS + Tailwind + ESLint + Prettier + Vitest.
- Merge → `main`.

### 1) Branding
- Ramas:
  - `branding/tokens` → design tokens (colors, spacing, radii, shadows).
  - `branding/typography` → fuentes, escalas, fallbacks.
  - `branding/components-foundation` → Button, Chip, Badge, Card, GlassPanel.
- Entregables:
  - `/docs/branding.md` (listo).
  - `tailwind.config.ts` con tokens.
  - `src/styles/globals.css`.
- Criterio de Done:
  - Storybook con los 4 componentes base y accesibilidad AA.

### 2) Messaging
- Ramas:
  - `messaging/voice-tone` → copia base, microcopys, i18n keys.
  - `messaging/components` → Header/Footers con textos reales; newsletter copy.
- Entregables:
  - `/docs/messaging.md` (listo).
  - `src/content/copy.json` o i18n files.
- DoD:
  - Lint text (máx 70 chars títulos), pruebas de legibilidad y contraste.

### 3) Architecture
- Ramas:
  - `architecture/app-shell` → layout base + rutas de alto nivel.
  - `architecture/content-model` → tipos `Movie`, `Studio`, `Page`.
  - `architecture/cms-wp` → integración a WP REST, caché ISR.
  - `architecture/data-import` → `scripts/wp-pull.ts`, `data/movies.json`.
- Entregables:
  - `/docs/sitemap.md`, `/docs/content-model.md`, `/docs/routes.md`, `/docs/data-import.md`.
- DoD:
  - Listados `/cine` SSR con filtros en URL, 200 OK y tiempos <1s en dev.

### 4) Design
- Ramas:
  - `design/ui-shell` → navbar sticky, hero, grids, carouseles.
  - `design/movie-page` → ficha completa + trailer + presskit.
  - `design/search-filters` → barra de filtros y estados.
  - `design/seo-a11y-perf` → schema, OG dinámico, a11y AA, LCP <2.5s.
- Entregables:
  - `/docs/design.md`, `/docs/seo.md`, `/docs/accessibility.md`, `/docs/performance.md`.
- DoD:
  - Lighthouse ≥90 en Performance/Best, AXE sin errores críticos.

### 5) Release & Deploy
- Rama: `release/v1.0.0`
- Entregables:
  - `/docs/deployment.md`, `/docs/qa.md`, `/docs/ops-playbook.md`.
- Tag: `v1.0.0` → deploy a producción.

---

## Flujo operativo (rápido)
1. Crea rama BMAD → desarrolla → PR a `main`.
2. Cada PR: template abajo, CI (lint + typecheck + test + build).
3. Merge squash → changelog automatizado (opcional con semantic-release).
4. Tag y despliegue (Vercel).

---

## Protecciones recomendadas
- `main`: requiere PR, 1–2 reviews, checks verdes, no force-push.
- Reglas de nombre: impedir commit directo a `main`, exigir Conventional Commits (hook opcional con commitlint).

---

## Backlog inicial por rama (checklist)
### `branding/tokens`
- [ ] Paleta glass-cinema en Tailwind
- [ ] Radii (xl/2xl para glass)
- [ ] Sombras suaves (1–3 niveles)
- [ ] Tokens de blur y opacidad

### `messaging/voice-tone`
- [ ] Claim principal y sub-mensajes en JSON
- [ ] Microcopys (CTAs, labels de estado)
- [ ] Validación con stakeholders (marketing)

### `architecture/cms-wp`
- [ ] `.env`: `WP_API_URL`, `ASSETS_BASE`
- [ ] Fetchers con `revalidate: 1800`
- [ ] Map de taxonomías WP → `Movie.status`/`studio`

### `design/movie-page`
- [ ] Título/subtítulo, runtime, rating
- [ ] Sinopsis corta/larga
- [ ] Fechas de estreno (UY)
- [ ] Trailer embed + gallery + presskit
- [ ] JSON-LD `Movie` + OG
