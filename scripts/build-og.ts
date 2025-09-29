import fs from "node:fs/promises";
import path from "node:path";

async function main() {
  const outputDir = path.resolve(process.cwd(), "public", "og");
  await fs.mkdir(outputDir, { recursive: true });

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0d10" />
      <stop offset="100%" stop-color="#18263f" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <text x="100" y="320" fill="#4db6ff" font-size="72" font-family="Arial, sans-serif">RBS Distribuidora</text>
</svg>`;

  await fs.writeFile(path.join(outputDir, "default.svg"), svg, "utf8");
  console.log("Generated fallback OG image at", path.join(outputDir, "default.svg"));
}

main().catch((error) => {
  console.error("Failed to build OG image", error);
  process.exit(1);
});
