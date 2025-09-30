import fs from "node:fs/promises";
import path from "node:path";

function resolvePath(filePath: string): string {
  return path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
}

async function ensureDirectoryForFile(filePath: string): Promise<void> {
  const directory = path.dirname(filePath);
  await fs.mkdir(directory, { recursive: true });
}

export async function readJsonFile<T>(filePath: string, defaultValue: T): Promise<T> {
  const absolutePath = resolvePath(filePath);

  try {
    const raw = await fs.readFile(absolutePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === "ENOENT") {
      await ensureDirectoryForFile(absolutePath);
      const fallback = JSON.parse(JSON.stringify(defaultValue)) as T;
      await fs.writeFile(absolutePath, JSON.stringify(fallback, null, 2) + "\n", "utf8");
      return fallback;
    }

    throw error;
  }
}

export async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  const absolutePath = resolvePath(filePath);
  await ensureDirectoryForFile(absolutePath);
  await fs.writeFile(absolutePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}
