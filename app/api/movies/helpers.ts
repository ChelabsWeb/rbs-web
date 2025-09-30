import type { MovieStatus } from "@/data/types";

export function getStringField(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export function getNumberField(formData: FormData, key: string): number | undefined {
  const value = getStringField(formData, key);
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function getFileField(formData: FormData, key: string): File | undefined {
  const value = formData.get(key);
  if (value instanceof File && value.size > 0) {
    return value;
  }

  return undefined;
}

export function getFileList(formData: FormData, key: string): File[] {
  return formData
    .getAll(key)
    .filter((item): item is File => item instanceof File && item.size > 0);
}

export function parseStatus(value: string | undefined): MovieStatus | undefined {
  if (!value) {
    return undefined;
  }

  const allowed: MovieStatus[] = ["in_theaters", "upcoming", "catalog"];
  return allowed.includes(value as MovieStatus) ? (value as MovieStatus) : undefined;
}
