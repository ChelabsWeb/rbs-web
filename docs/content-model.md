# Modelo de Contenido (Headless)

## Tipos
- **Movie**
  - `title` (string)
  - `slug` (string)
  - `subtitle_local` (string opcional)
  - `synopsis_short` (text)
  - `synopsis_long` (rich)
  - `runtime_min` (int)
  - `rating` (string, ej: ATP, 12, 15)
  - `genres` (array string)
  - `studio` (enum: Disney, Universal, Paramount, etc.)
  - `status` (enum: CARTELERA | PROXIMAMENTE | CATÁLOGO)
  - `release_dates` (array de `{ country, date }`, obligatorio `Uruguay`)
  - `trailer_url` (url)
  - `poster` (image, ratio 2:3)
  - `backdrop` (image, 16:9)
  - `gallery` (images[])
  - `presskit` (files[])
  - `credits` (`director[]`, `cast[]`)
  - `links` (`tickets_url?`, `site_oficial?`)
  - `seo` (title, description, og:image)

- **Studio**
  - `name`, `slug`, `logo`, `brand_color`

- **Page** (CMS: quienes, licencias, contacto)

## Mapeo desde WP
- Post Types/Categorías existentes por estudio/estado → `Movie.studio` y `Movie.status`.
