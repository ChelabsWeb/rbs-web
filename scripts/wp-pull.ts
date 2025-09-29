import fs from "node:fs/promises";
import path from "node:path";
import { getMovies } from "@/data/wp";

async function main() {
  const movies = await getMovies();
  const outputPath = path.resolve(process.cwd(), "data", "movies.json");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(movies, null, 2));
  console.log(`Saved ${movies.length} movies to ${outputPath}`);
}

main().catch((error) => {
  console.error("Failed to pull data from WordPress", error);
  process.exit(1);
});
