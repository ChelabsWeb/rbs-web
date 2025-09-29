import type { Movie } from "./types";

export interface SearchParams {
  query: string;
}

export async function searchMovies(params: SearchParams): Promise<Movie[]> {
  // Placeholder: integrate Algolia or Meilisearch in a future iteration
  if (!params.query) {
    return [];
  }

  return [];
}
