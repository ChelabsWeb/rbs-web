import type { Movie } from "@/data/types";

export function buildMovieJsonLd(movie: Movie) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    datePublished: movie.releaseDate,
    image: movie.posterUrl,
    productionCompany: movie.studio
      ? {
          "@type": "Organization",
          name: movie.studio,
        }
      : undefined,
    description: movie.synopsis,
  };
}
