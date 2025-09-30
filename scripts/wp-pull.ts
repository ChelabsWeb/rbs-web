import fs from "node:fs/promises";
import path from "node:path";
import { getMovies, getStudios, getUpcoming } from "@/data/wp";

async function main() {
  const outputDir = path.resolve(process.cwd(), "data");
  const moviesPath = path.join(outputDir, "movies.json");
  const studiosPath = path.join(outputDir, "studios.json");
  const upcomingPath = path.join(outputDir, "upcoming.json");

  await fs.mkdir(outputDir, { recursive: true });

  const [movies, studios, upcoming] = await Promise.all([
    getMovies(),
    getStudios(),
    getUpcoming(),
  ]);

  await Promise.all([
    fs.writeFile(moviesPath, JSON.stringify(movies, null, 2), "utf8"),
    fs.writeFile(studiosPath, JSON.stringify(studios, null, 2), "utf8"),
    fs.writeFile(upcomingPath, JSON.stringify(upcoming, null, 2), "utf8"),
  ]);

  console.log(`Saved ${movies.length} movies to ${moviesPath}`);
  console.log(`Saved ${studios.length} studios to ${studiosPath}`);
  console.log(`Saved ${upcoming.length} upcoming entries to ${upcomingPath}`);
}

main().catch((error) => {
  console.error("Failed to pull data from WordPress", error);
  process.exit(1);
});
