import type { Movie } from "./types";

interface WordpressMovie {
  id: number;
  slug: string;
  title: { rendered: string };
  acf?: {
    release_date?: string;
    studio?: string;
    poster_url?: string;
  };
}

export function mapWordpressMovie(movie: WordpressMovie): Movie {
  return {
    id: String(movie.id),
    slug: movie.slug,
    title: movie.title.rendered,
    releaseDate: movie.acf?.release_date,
    studio: movie.acf?.studio,
    posterUrl: movie.acf?.poster_url,
  };
}
