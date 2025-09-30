import { randomUUID } from "node:crypto";
import type { Movie, MovieStatus } from "@/data/types";
import { readJsonFile, writeJsonFile } from "@/server/storage/json";

const MOVIES_FILE = "data/movies.json";

export interface MovieDraft {
  title: string;
  slug?: string;
  synopsis?: string;
  releaseDate?: string;
  studio?: string;
  status?: MovieStatus;
  genre?: string;
  runtimeMinutes?: number;
  posterUrl?: string;
  bannerUrl?: string;
  trailerUrl?: string;
  videoUrls?: string[];
}

export type UpdateMovieInput = Partial<Omit<MovieDraft, "title">> & { title?: string };

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureUniqueSlug(baseSlug: string, movies: Movie[], currentId?: string): string {
  const normalizedBase = baseSlug || "pelicula";
  const usedSlugs = new Set(
    movies.filter((movie) => movie.id !== currentId).map((movie) => movie.slug),
  );

  if (!usedSlugs.has(normalizedBase)) {
    return normalizedBase;
  }

  let suffix = 2;
  let candidate = `${normalizedBase}-${suffix}`;
  while (usedSlugs.has(candidate)) {
    suffix += 1;
    candidate = `${normalizedBase}-${suffix}`;
  }

  return candidate;
}

function normalizeMovie(movie: Movie): Movie {
  return {
    ...movie,
    videoUrls: movie.videoUrls ?? [],
  };
}

async function loadMovies(): Promise<Movie[]> {
  const movies = await readJsonFile<Movie[]>(MOVIES_FILE, []);
  return movies.map(normalizeMovie);
}

async function saveMovies(movies: Movie[]): Promise<void> {
  await writeJsonFile<Movie[]>(MOVIES_FILE, movies);
}

export async function getMovies(): Promise<Movie[]> {
  const movies = await loadMovies();
  return movies
    .slice()
    .sort((a, b) => {
      const aDate = a.updatedAt ?? a.createdAt ?? "";
      const bDate = b.updatedAt ?? b.createdAt ?? "";

      if (aDate && bDate && aDate !== bDate) {
        return bDate.localeCompare(aDate);
      }

      return a.title.localeCompare(b.title);
    });
}

export async function getMovieById(id: string): Promise<Movie | undefined> {
  const movies = await loadMovies();
  return movies.find((movie) => movie.id === id);
}

export async function getMovieBySlug(slug: string): Promise<Movie | undefined> {
  const movies = await loadMovies();
  return movies.find((movie) => movie.slug === slug);
}

export async function createMovie(input: MovieDraft): Promise<Movie> {
  if (!input.title?.trim()) {
    throw new Error("El titulo de la pelicula es obligatorio");
  }

  const movies = await loadMovies();
  const now = new Date().toISOString();
  const baseSlug = slugify(input.slug ?? input.title);
  const uniqueSlug = ensureUniqueSlug(baseSlug, movies);
  const id = randomUUID();

  const newMovie: Movie = {
    id,
    title: input.title.trim(),
    slug: uniqueSlug,
    synopsis: input.synopsis?.trim() || undefined,
    releaseDate: input.releaseDate || undefined,
    studio: input.studio?.trim() || undefined,
    status: input.status,
    genre: input.genre?.trim() || undefined,
    runtimeMinutes: input.runtimeMinutes,
    posterUrl: input.posterUrl,
    bannerUrl: input.bannerUrl,
    trailerUrl: input.trailerUrl,
    videoUrls: input.videoUrls?.filter(Boolean) ?? [],
    createdAt: now,
    updatedAt: now,
  };

  movies.push(newMovie);
  await saveMovies(movies);

  return newMovie;
}

export async function updateMovie(id: string, input: UpdateMovieInput): Promise<Movie> {
  const movies = await loadMovies();
  const index = movies.findIndex((movie) => movie.id === id);

  if (index === -1) {
    throw new Error("Pelicula no encontrada");
  }

  const existing = normalizeMovie(movies[index]);
  const now = new Date().toISOString();
  const updated: Movie = { ...existing, updatedAt: now };

  if (input.title !== undefined) {
    const trimmed = input.title.trim();
    if (!trimmed) {
      throw new Error("El titulo no puede estar vacio");
    }
    updated.title = trimmed;
  }

  const shouldUpdateSlug = input.slug !== undefined || input.title !== undefined;
  if (shouldUpdateSlug) {
    const source = input.slug ?? input.title ?? existing.title;
    const baseSlug = slugify(source);
    const normalizedBase = baseSlug || `pelicula-${existing.id.slice(0, 8)}`;
    updated.slug = ensureUniqueSlug(normalizedBase, movies, existing.id);
  }

  if (input.synopsis !== undefined) {
    updated.synopsis = input.synopsis.trim() || undefined;
  }

  if (input.releaseDate !== undefined) {
    updated.releaseDate = input.releaseDate || undefined;
  }

  if (input.studio !== undefined) {
    updated.studio = input.studio.trim() || undefined;
  }

  if (input.status !== undefined) {
    updated.status = input.status;
  }

  if (input.genre !== undefined) {
    updated.genre = input.genre.trim() || undefined;
  }

  if (input.runtimeMinutes !== undefined) {
    updated.runtimeMinutes = input.runtimeMinutes;
  }

  if (input.posterUrl !== undefined) {
    updated.posterUrl = input.posterUrl;
  }

  if (input.bannerUrl !== undefined) {
    updated.bannerUrl = input.bannerUrl;
  }

  if (input.trailerUrl !== undefined) {
    updated.trailerUrl = input.trailerUrl;
  }

  if (input.videoUrls !== undefined) {
    updated.videoUrls = input.videoUrls.filter(Boolean);
  }

  movies[index] = updated;
  await saveMovies(movies);

  return updated;
}

export async function deleteMovie(id: string): Promise<Movie | undefined> {
  const movies = await loadMovies();
  const index = movies.findIndex((movie) => movie.id === id);

  if (index === -1) {
    return undefined;
  }

  const [removed] = movies.splice(index, 1);
  await saveMovies(movies);
  return removed;
}
