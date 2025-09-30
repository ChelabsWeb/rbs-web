import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/AppShell/Container";
import { PosterCard } from "@/components/PosterCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getMovies } from "@/server/movies";
import type { Movie } from "@/data/types";

export const dynamic = "force-dynamic";

function formatReleaseDate(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("es-UY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function mapPoster(movie: Movie) {
  return {
    title: movie.title,
    releaseDate: formatReleaseDate(movie.releaseDate),
    studio: movie.studio,
    posterUrl: movie.posterUrl,
    href: `/peliculas/${movie.slug}`,
  };
}

function pickFeatured(movies: Movie[]): Movie[] {
  const inTheaters = movies.filter((movie) => movie.status === "in_theaters");
  const upcoming = movies.filter((movie) => movie.status === "upcoming");

  if (inTheaters.length >= 5) {
    return inTheaters.slice(0, 5);
  }

  return [...inTheaters, ...upcoming].slice(0, 5);
}

export default async function HomePage() {
  const movies = await getMovies();
  const inTheaters = movies.filter((movie) => movie.status === "in_theaters");
  const upcoming = movies.filter((movie) => movie.status === "upcoming");
  const catalog = movies.filter((movie) => movie.status === "catalog");
  const featured = pickFeatured(movies);

  const heroStats = [
    { label: "Peliculas activas", value: inTheaters.length.toString().padStart(2, "0") },
    { label: "Proximos estrenos", value: upcoming.length.toString().padStart(2, "0") },
    { label: "Catalogo total", value: movies.length.toString().padStart(2, "0") },
  ];

  return (
    <main className="flex flex-col gap-20 pb-20">
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(77,182,255,0.3),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(255,93,162,0.25),transparent_50%)]" />
        <Container className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-glass-cinema-outline bg-glass-cinema-surface px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-glass-cinema-text-muted">
              Estrenos RBS
            </span>
            <div className="space-y-5">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-glass-cinema-primary sm:text-6xl">
                El cine que mueve a Uruguay.
              </h1>
              <p className="max-w-xl text-base text-glass-cinema-text-muted sm:text-lg">
                Representamos a los grandes estudios internacionales y conectamos sus estrenos con el publico local.
                Explora la cartelera, descarga materiales oficiales y planifica tus lanzamientos.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/cine"
                className="rounded-full bg-glass-cinema-primary px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-glass-cinema-secondary"
              >
                Ver cartelera
              </Link>
              <Link
                href="/contacto"
                className="rounded-full border border-glass-cinema-outline px-6 py-3 text-sm font-semibold text-glass-cinema-text transition hover:border-glass-cinema-primary"
              >
                Hablar con el equipo
              </Link>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface p-6 shadow-glass"
                >
                  <dt className="text-xs uppercase tracking-[0.35em] text-glass-cinema-text-muted">{stat.label}</dt>
                  <dd className="mt-3 font-display text-3xl font-semibold text-glass-cinema-text">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative h-full min-h-[260px] overflow-hidden rounded-[2.5rem] border border-glass-cinema-outline/60 bg-glass-cinema-surface shadow-glass">
            <Image
              src="/og-default.png"
              alt="RBS Distribuidora hero"
              fill
              className="object-cover opacity-70"
              sizes="(min-width: 1024px) 420px, 100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-glass-cinema-backdrop via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-glass-cinema-text-muted">Actualizado cada semana</p>
              <p className="mt-2 font-display text-2xl text-glass-cinema-text">
                Acceso directo al material oficial de tus estrenos
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="space-y-10">
        <Container>
          <SectionTitle
            eyebrow="Destacados"
            title="Estrenos destacados"
            description="Una seleccion curada de los titulos con mayor prioridad comercial en las proximas semanas."
            action={
              <Link
                href="/cine"
                className="text-sm font-semibold text-glass-cinema-primary transition hover:text-glass-cinema-secondary"
              >
                Ver agenda completa ->
              </Link>
            }
          />
        </Container>
        {featured.length > 0 ? (
          <div className="no-scrollbar overflow-x-auto px-6 sm:px-12 lg:px-24">
            <div className="flex min-w-max gap-6">
              {featured.map((movie) => (
                <div key={movie.id} className="w-[220px] shrink-0">
                  <PosterCard {...mapPoster(movie)} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="px-6 text-sm text-glass-cinema-text-muted sm:px-12 lg:px-24">
            Todavia no hay estrenos destacados cargados. Agrega peliculas desde el panel de administracion.
          </p>
        )}
      </section>

      <section className="space-y-10">
        <Container>
          <SectionTitle
            eyebrow="Ahora"
            title="En cartelera"
            description="Peliculas activas en circuitos nacionales con materiales actualizados."
          />
        </Container>
        {inTheaters.length > 0 ? (
          <div className="no-scrollbar overflow-x-auto px-6 sm:px-12 lg:px-24">
            <div className="flex min-w-max gap-6">
              {inTheaters.slice(0, 10).map((movie) => (
                <div key={movie.id} className="w-[220px] shrink-0">
                  <PosterCard {...mapPoster(movie)} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="px-6 text-sm text-glass-cinema-text-muted sm:px-12 lg:px-24">
            Carga peliculas con estado "En cartelera" para mostrarlas en esta seccion.
          </p>
        )}
      </section>

      <section className="space-y-10">
        <Container>
          <SectionTitle
            eyebrow="Planificacion"
            title="Proximos estrenos"
            description="Calendario preliminar para cines, partners y licenciatarios."
          />
        </Container>
        {upcoming.length > 0 ? (
          <div className="no-scrollbar overflow-x-auto px-6 sm:px-12 lg:px-24">
            <div className="flex min-w-max gap-6">
              {upcoming.slice(0, 10).map((movie) => (
                <div key={movie.id} className="w-[220px] shrink-0">
                  <PosterCard {...mapPoster(movie)} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="px-6 text-sm text-glass-cinema-text-muted sm:px-12 lg:px-24">
            Marca peliculas como "Proximamente" para que aparezcan aqui.
          </p>
        )}
      </section>

      {catalog.length > 0 ? (
        <section className="space-y-10">
          <Container>
            <SectionTitle
              eyebrow="Catalogo"
              title="Biblioteca permanente"
              description="Historico de titulos disponibles para programaciones especiales y ciclos tematicos."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {catalog.slice(0, 6).map((movie) => (
                <PosterCard key={movie.id} {...mapPoster(movie)} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
