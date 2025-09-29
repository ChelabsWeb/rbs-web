# Design System — “Glass Cinema”
Visual identity moderna, legible y cinematográfica.

## Paleta
- **Fondo**: #0B0D10 (negro pizarra)
- **Card/Glass**: rgba(255,255,255,0.06) con blur 12–16px, borde 1px rgba(255,255,255,0.12)
- **Primario (azul neón)**: #4DB6FF
- **Secundario (magenta neón)**: #FF5DA2
- **Accento**: #F3BA16 (guiño a marketing existente)
- **Texto**: #E6E8EA (primario), #AAB1B7 (secundario)

## Tipografía
- Titulares: **SF Pro Display / Inter Tight** (600–800)
- Cuerpo: **Inter** (400–500)
- Numerales (fecha/score): Tabulares

## Componentes clave
- **Navbar sticky** transparente → “glass” al scrollear
- **Hero** con backdrops en `object-cover` + gradient overlay 45º
- **Píldoras** de estado: `Cartelera`, `Próximamente`, `Reestreno`
- **PosterCard** (ratio 2:3) con hover parallax leve
- **EstudioChip** (logo + nombre) filtrable
- **EstrenosGrid** con infinite scroll y “load more”
- **Ficha de película** con:
  - Título, subtítulo local, runtime, clasificación
  - Sinopsis corta/larga
  - **Fechas de estreno en Uruguay**
  - Tráiler embebido (YouTube/Vimeo)
  - Créditos claves (director, elenco top)
  - Distribuidora (logo), estados (cartelera / próximamente)
  - Presskit: pósteres, logos, stills (descargables)
  - CTA a cines/entradas

## Interacciones
- Micro-animaciones con Framer Motion (duración ≤180ms)
- Focus states visibles (a11y), contraste AA mínimo
- Skeletons para carga (poster y texto)

## Dark mode only (por ahora)
Cine = oscuro. Mantener consistencia.

## Ilustraciones/fondos
- Backdrops con blur + overlay degradado; evitar banding.
