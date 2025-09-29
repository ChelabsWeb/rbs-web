import { wordpressConfig } from "@/config";
import type { Movie, Studio } from "./types";

const DEFAULT_REVALIDATE_SECONDS = 60;

async function fetchJson<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const url = new URL(endpoint, wordpressConfig.baseUrl);
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(wordpressConfig.authToken ? { Authorization: `Bearer ${wordpressConfig.authToken}` } : {}),
    ...(init?.headers ?? {}),
  };

  const response = await fetch(url, {
    ...init,
    headers,
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getMovies(): Promise<Movie[]> {
  if (!wordpressConfig.baseUrl) {
    return [];
  }

  return fetchJson<Movie[]>("/wp/v2/movies");
}

export async function getStudios(): Promise<Studio[]> {
  if (!wordpressConfig.baseUrl) {
    return [];
  }

  return fetchJson<Studio[]>("/wp/v2/studios");
}
