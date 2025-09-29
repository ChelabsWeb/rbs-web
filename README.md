# RBS Distribuidora Web

Proyecto base construido con Next.js 14, TypeScript, TailwindCSS y Storybook para la nueva web de RBS Distribuidora de Peliculas.

## Scripts

- `pnpm dev`: inicia el servidor de desarrollo.
- `pnpm build`: genera el build de produccion.
- `pnpm lint`: ejecuta ESLint.
- `pnpm test`: corre Vitest en modo una sola vez.
- `pnpm storybook`: inicia Storybook.
- `pnpm build-storybook`: genera la version estatica de Storybook.
- `pnpm wp:pull`: sincroniza peliculas desde WordPress.
- `pnpm og:build`: genera assets OG por defecto.

## Estructura

- `app/`: paginas con App Router.
- `src/components/`: biblioteca de componentes.
- `src/data/`: tipos y conectores de datos.
- `src/styles/`: tokens y configuraciones de tema.
- `docs/`: documentacion BMAD.
- `codex/`: orquestador e instrucciones para cada etapa.

## Requisitos

- Node.js 20+
- pnpm 9+

## CI

El flujo `ci.yml` ejecuta lint, typecheck, pruebas y build para garantizar calidad continua.
