import { Container } from "@/components/AppShell/Container";
import { MovieGrid } from "@/components/MovieGrid";
import { getMovies } from "@/server/movies";
import type { Movie } from "@/data/types";

export const dynamic = "force-dynamic";

function mapPoster(movie: Movie) {
  return {
    title: movie.title,
    releaseDate: movie.releaseDate,
    studio: movie.studio,
    posterUrl: movie.posterUrl,
    href: `/peliculas/${movie.slug}`,
  };
}

export default async function CinePage() {
  const movies = await getMovies();
  const inTheaters = movies.filter((movie) => movie.status === "in_theaters");
  const upcoming = movies.filter((movie) => movie.status === "upcoming");
  const catalog = movies.filter((movie) => movie.status === "catalog");

  return (
    <main className="bg-glass-cinema-backdrop py-12">
      <Container className="space-y-10">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-widest text-glass-cinema-text-muted">Catalogo</p>
          <h1 className="font-display text-4xl font-semibold text-glass-cinema-text">Cartelera actual</h1>
          <p className="max-w-2xl text-base text-glass-cinema-text-muted">
            Filtra por estado para encontrar estrenos listos para promocion, titulos proximos o producciones del
            catalogo permanente.
          </p>
        </header>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-glass-cinema-text">En cartelera</h2>
            <span className="text-xs uppercase tracking-[0.35em] text-glass-cinema-text-muted">
              {inTheaters.length} titulos
            </span>
          </div>
          {inTheaters.length > 0 ? (
            <MovieGrid items={inTheaters.map(mapPoster)} />
          ) : (
            <div className="rounded-3xl border border-dashed border-glass-cinema-outline bg-glass-cinema-surface/60 p-10 text-center text-sm text-glass-cinema-text-muted">
              No hay peliculas activas en este momento. Marca producciones con estado "in_theaters" para mostrarlas aqui.
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-glass-cinema-text">Proximos estrenos</h2>
            <span className="text-xs uppercase tracking-[0.35em] text-glass-cinema-text-muted">
              {upcoming.length} titulos
            </span>
          </div>
          {upcoming.length > 0 ? (
            <MovieGrid items={upcoming.map(mapPoster)} />
          ) : (
            <div className="rounded-3xl border border-dashed border-glass-cinema-outline bg-glass-cinema-surface/60 p-10 text-center text-sm text-glass-cinema-text-muted">
              No hay estrenos marcados como proximos. Actualiza las fechas en el panel de administracion.
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-glass-cinema-text">Catalogo historico</h2>
            <span className="text-xs uppercase tracking-[0.35em] text-glass-cinema-text-muted">
              {catalog.length} titulos
            </span>
          </div>
          {catalog.length > 0 ? (
            <MovieGrid items={catalog.map(mapPoster)} />
          ) : (
            <div className="rounded-3xl border border-dashed border-glass-cinema-outline bg-glass-cinema-surface/60 p-10 text-center text-sm text-glass-cinema-text-muted">
              Carga peliculas con estado "catalog" para construir tu biblioteca permanente.
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
