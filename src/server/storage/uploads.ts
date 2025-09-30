import { Buffer } from "node:buffer";
import { randomBytes } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const UPLOADS_ROOT = path.join(process.cwd(), "public", "uploads");

const MIME_EXTENSION_MAP: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
  "video/mp4": ".mp4",
  "video/quicktime": ".mov",
  "video/webm": ".webm",
};

function sanitizeFileName(value: string): string {
  const base = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

  return base || "archivo";
}

function inferExtension(file: File): string {
  const fromName = path.extname(file.name);
  if (fromName) {
    return fromName.toLowerCase();
  }

  const fromMime = MIME_EXTENSION_MAP[file.type];
  return fromMime ?? "";
}

export function isManagedUpload(publicPath: string | undefined | null): publicPath is string {
  return typeof publicPath === "string" && publicPath.startsWith("/uploads/");
}

export async function saveUploadedFile(file: File, subdirectory: string): Promise<string> {
  const filenameBase = sanitizeFileName(path.parse(file.name).name);
  const extension = inferExtension(file);
  const uniqueSuffix = randomBytes(4).toString("hex");
  const filename = `${filenameBase}-${Date.now()}-${uniqueSuffix}${extension}`;
  const targetDir = path.join(UPLOADS_ROOT, subdirectory);
  const targetPath = path.join(targetDir, filename);

  await fs.mkdir(targetDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(targetPath, buffer);

  const normalizedDir = subdirectory.replace(/\\/g, "/");
  return path.posix.join("/uploads", normalizedDir, filename);
}

export async function deleteUploadedFile(publicPath: string | undefined | null): Promise<void> {
  if (!isManagedUpload(publicPath)) {
    return;
  }

  const relativePath = publicPath.replace(/^\/+/, "");
  const absolutePath = path.join(process.cwd(), "public", relativePath);

  try {
    await fs.unlink(absolutePath);
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code !== "ENOENT") {
      throw error;
    }
  }
}
