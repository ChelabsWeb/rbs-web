import type { Movie } from "@/data/types";
import { MovieEditCard } from "./MovieEditCard";

interface AdminMovieListProps {
  movies: Movie[];
}

export function AdminMovieList({ movies }: AdminMovieListProps) {
  if (movies.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-glass-cinema-outline bg-glass-cinema-surface/60 p-10 text-center">
        <p className="font-display text-lg text-glass-cinema-text">Todavia no hay peliculas cargadas.</p>
        <p className="mt-2 text-sm text-glass-cinema-text-muted">
          Usa el formulario de arriba para comenzar y los estrenos apareceran aqui para su edicion.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {movies.map((movie) => (
        <MovieEditCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
