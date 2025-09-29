export function GET() {
  const lines = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /components-examples",
    "Sitemap: https://www.rbs.com.uy/api/sitemap",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
