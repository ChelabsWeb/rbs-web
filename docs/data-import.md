# Ingesta de Contenido desde WordPress

## Estrategia
1. **Leer** taxonomías/categorías actuales (estudio, estado) vía REST `wp-json/wp/v2/`.
2. **Mapear** a `Movie` y `Studio` según `/docs/content-model.md`.
3. **Normalizar** imágenes (poster/backdrop).
4. **Enriquecer** con metadatos faltantes (runtime, rating) si están en campos ACF; si no, campos manuales.

## Pasos
- `.env.local`:
WP_API_URL=https://www.rbs.com.uy/wp-json/wp/v2
ASSETS_BASE=https://www.rbs.com.uy/wp-content/uploads

- Script `scripts/wp-pull.ts`:
- Paginado de posts
- Resolución de categorías `.../categories?search=Universal`, `.../peliculas_categoria/...` (según configuración WP actual)
- Store local en `data/movies.json` + `public/studios/*.svg`.

## Duplicados / limpieza
- Deduplicar por `title + (year?)`.
- Slugify consistente.
