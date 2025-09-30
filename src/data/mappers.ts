import type { Movie, Studio } from "./types";

interface WordpressMovie {
  id: number;
  slug: string;
  title: { rendered: string };
  acf?: {
    release_date?: string;
    studio?: string;
    poster_url?: string;
    synopsis?: string;
  };
}

interface WordpressStudio {
  id: number;
  slug: string;
  name: string;
  acf?: {
    logo_url?: string;
    description?: string;
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
    synopsis: movie.acf?.synopsis,
  };
}

export function mapWordpressStudio(studio: WordpressStudio): Studio {
  return {
    id: String(studio.id),
    slug: studio.slug,
    name: studio.name,
    logoUrl: studio.acf?.logo_url,
    description: studio.acf?.description,
  };
}
