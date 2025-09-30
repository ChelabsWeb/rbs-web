export const siteConfig = {
  name: "RBS Distribuidora",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rbs.com.uy",
  description:
    "Distribuidora lider de peliculas en Uruguay. Catalogo, estrenos y recursos oficiales para cines, estudios y marcas.",
  ogImage: "/og-default.png",
  locale: "es_UY",
};

export const wordpressConfig = {
  baseUrl: process.env.WORDPRESS_API_BASE_URL ?? "",
  authToken: process.env.WORDPRESS_AUTH_TOKEN ?? "",
  user: process.env.WORDPRESS_API_USER ?? "",
  password: process.env.WORDPRESS_API_PASSWORD ?? "",
};
