# Despliegue (Vercel)

## Requisitos
- Cuenta Vercel + GitHub repo
- Variables `.env` (ver `/docs/data-import.md`)

## Pasos
1. **Crear proyecto** en Vercel, vincular repo.
2. **Variables**: `WP_API_URL`, `ASSETS_BASE`, `ALGOLIA_*` (si aplica).
3. **Build**: `pnpm install && pnpm build`
4. **ISR/Cache**: configurar `revalidate` en pages (30–60 min para listados; 1–6 h para fichas).
5. **Domains**: agregar `www.rbs.com.uy` y `rbs.com.uy`, activar redirect `non-www → www`.
6. **Headers**:
   - `Cache-Control` estático `immutable`
   - `Content-Security-Policy` básica (img, media, YT)
7. **Monitoreo**: activar Vercel Analytics y Alerts.

## Rollbacks
- Usar “Promote previous deployment”.
