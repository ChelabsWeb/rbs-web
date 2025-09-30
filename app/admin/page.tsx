import { Container } from "@/components/AppShell/Container";
import { AdminMovieList } from "@/components/admin/AdminMovieList";
import { MovieCreateForm } from "@/components/admin/MovieCreateForm";
import { getMovies } from "@/server/movies";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const movies = await getMovies();

  return (
    <main className="bg-glass-cinema-backdrop py-12">
      <Container className="space-y-10">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-glass-cinema-text-muted">Panel privado</p>
          <h1 className="font-display text-4xl text-glass-cinema-text">Gestor de estrenos</h1>
          <p className="max-w-2xl text-sm text-glass-cinema-text-muted">
            Administra el catalogo de peliculas y sus materiales oficiales sin depender de WordPress. Toda la
            informacion que cargues aqui se replica en el sitio publico.
          </p>
        </header>

        <MovieCreateForm />

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-glass-cinema-text">Peliculas existentes</h2>
          <AdminMovieList movies={movies} />
        </section>
      </Container>
    </main>
  );
}
