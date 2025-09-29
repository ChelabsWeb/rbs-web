const BASE_URL = "https://www.rbs.com.uy";

const routes = [
  "",
  "/cine",
  "/proximamente",
  "/busqueda",
  "/licencias",
  "/quienes-somos",
  "/contacto",
  "/prensa",
];

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((route) => {
      return `  <url><loc>${BASE_URL}${route}</loc><lastmod>${new Date().toISOString()}</lastmod></url>`;
    })
    .join("\n")}\n</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
