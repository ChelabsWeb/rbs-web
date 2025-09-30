import { Buffer } from "node:buffer";
import { wordpressConfig } from "@/config";
import type { Movie, Studio } from "./types";
import { mapWordpressMovie, mapWordpressStudio } from "./mappers";

const REVALIDATE_SECONDS = 1800;
const URUGUAY_OFFSET_MINUTES = -180;

interface FetchMoviesInput {
  studio?: string;
  status?: string;
  q?: string;
  genre?: string;
  year?: number;
  page?: number;
}

interface WordpressCollectionResponse<T> {
  data: T[];
}

interface WordpressMovieRaw {
  id: number;
  slug: string;
  title: { rendered: string };
  [key: string]: unknown;
}

interface WordpressStudioRaw {
  id: number;
  slug: string;
  name: string;
  [key: string]: unknown;
}

function resolveAuthHeader(): string | undefined {
  if (wordpressConfig.authToken) {
    return wordpressConfig.authToken.startsWith("Basic ") ||
      wordpressConfig.authToken.startsWith("Bearer ")
      ? wordpressConfig.authToken
      : `Bearer ${wordpressConfig.authToken}`;
  }

  if (wordpressConfig.user && wordpressConfig.password) {
    const base64 = Buffer.from(`${wordpressConfig.user}:${wordpressConfig.password}`).toString(
      "base64",
    );
    return `Basic ${base64}`;
  }

  return undefined;
}

async function fetchJson<T>(endpoint: string, init?: RequestInit): Promise<T> {
  if (!wordpressConfig.baseUrl) {
    throw new Error("WORDPRESS_API_BASE_URL is not configured");
  }

  const url = new URL(endpoint, wordpressConfig.baseUrl);
  const headers = new Headers(init?.headers ?? {});
  headers.set("Content-Type", "application/json");

  const authHeader = resolveAuthHeader();
  if (authHeader) {
    headers.set("Authorization", authHeader);
  }

  const response = await fetch(url, {
    ...init,
    headers,
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

function getTodayUruguayRfc3339(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() + URUGUAY_OFFSET_MINUTES);
  return now.toISOString();
}

export async function getMovies({
  studio,
  status,
  q,
  genre,
  year,
  page,
}: FetchMoviesInput = {}): Promise<Movie[]> {
  if (!wordpressConfig.baseUrl) {
    return [];
  }

  const params = new URLSearchParams();
  if (studio) params.set("studio", studio);
  if (status) params.set("status", status);
  if (genre) params.set("genre", genre);
  if (q) params.set("search", q);
  if (year) params.set("year", String(year));
  if (page) params.set("page", String(page));

  const endpoint = `/wp-json/rbs/v1/movies?${params.toString()}`;
  const response = await fetchJson<WordpressCollectionResponse<WordpressMovieRaw>>(endpoint);
  return response.data.map((movie) => mapWordpressMovie(movie));
}

export async function getMovieBySlug(slug: string): Promise<Movie | null> {
  if (!wordpressConfig.baseUrl) {
    return null;
  }

  const endpoint = `/wp-json/rbs/v1/movies/${slug}`;
  const response = await fetchJson<WordpressMovieRaw | null>(endpoint);
  return response ? mapWordpressMovie(response) : null;
}

export async function getStudios(): Promise<Studio[]> {
  if (!wordpressConfig.baseUrl) {
    return [];
  }

  const endpoint = `/wp-json/rbs/v1/studios`;
  const response = await fetchJson<WordpressCollectionResponse<WordpressStudioRaw>>(endpoint);
  return response.data.map((studio) => mapWordpressStudio(studio));
}

export async function getUpcoming({ from }: { from?: string } = {}): Promise<Movie[]> {
  if (!wordpressConfig.baseUrl) {
    return [];
  }

  const params = new URLSearchParams();
  params.set("from", from ?? getTodayUruguayRfc3339());

  const endpoint = `/wp-json/rbs/v1/movies/upcoming?${params.toString()}`;
  const response = await fetchJson<WordpressCollectionResponse<WordpressMovieRaw>>(endpoint);
  return response.data.map((movie) => mapWordpressMovie(movie));
}
