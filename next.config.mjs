/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["app", "src", "tests"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.wp.com",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
