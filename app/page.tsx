import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/AppShell/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { PosterCard } from "@/components/PosterCard";

const HERO_STATS = [
  { label: "Pel�culas activas", value: "45" },
  { label: "Cines asociados", value: "20" },
  { label: "Estrenos 2025", value: "35" },
  { label: "A�os de trayectoria", value: "25" },
];

const FEATURED_PLACEHOLDER = Array.from({ length: 5 }, (_, index) => ({
  title: `Estreno destacado ${index + 1}`,
  releaseDate: "Fecha por confirmar",
  studio: index % 2 === 0 ? "Disney" : "Universal",
}));

const IN_THEATERS_PLACEHOLDER = Array.from({ length: 6 }, (_, index) => ({
  title: `En cartelera ${index + 1}`,
  releaseDate: "Ahora en salas",
  studio: index % 3 === 0 ? "Paramount" : "RBS",
}));

const UPCOMING_PLACEHOLDER = Array.from({ length: 6 }, (_, index) => ({
  title: `Pr�ximo estreno ${index + 1}`,
  releaseDate: "Muy pronto",
  studio: index % 2 === 0 ? "Disney" : "Universal",
}));

export default function HomePage() {
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
                Representamos a los grandes estudios internacionales y conectamos sus estrenos con
                el p�blico local. Explor� el line up, descarg� materiales oficiales y planific� tus
                pr�ximos lanzamientos.
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
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface p-6 shadow-glass"
                >
                  <dt className="text-xs uppercase tracking-[0.35em] text-glass-cinema-text-muted">
                    {stat.label}
                  </dt>
                  <dd className="mt-3 font-display text-3xl font-semibold text-glass-cinema-text">
                    {stat.value}
                  </dd>
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
              <p className="text-xs uppercase tracking-[0.35em] text-glass-cinema-text-muted">
                Pr�ximamente
              </p>
              <p className="mt-2 font-display text-2xl text-glass-cinema-text">
                Marat�n de estrenos internacionales 2025
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="space-y-10">
        <Container>
          <SectionTitle
            eyebrow="Featured"
            title="Estrenos destacados"
            description="Avance de los t�tulos que liderar�n la taquilla en los pr�ximos meses."
            action={
              <Link
                href="/cine"
                className="text-sm font-semibold text-glass-cinema-primary transition hover:text-glass-cinema-secondary"
              >
                Ver agenda completa ?
              </Link>
            }
          />
        </Container>
        <div className="no-scrollbar overflow-x-auto px-6 sm:px-12 lg:px-24">
          <div className="flex min-w-max gap-6">
            {FEATURED_PLACEHOLDER.map((movie) => (
              <div key={movie.title} className="w-[220px] shrink-0">
                <PosterCard {...movie} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <Container>
          <SectionTitle
            eyebrow="Ahora"
            title="En cartelera"
            description="Pel�culas activas en circuitos nacionales con materiales actualizados."
          />
        </Container>
        <div className="no-scrollbar overflow-x-auto px-6 sm:px-12 lg:px-24">
          <div className="flex min-w-max gap-6">
            {IN_THEATERS_PLACEHOLDER.map((movie) => (
              <div key={movie.title} className="w-[220px] shrink-0">
                <PosterCard {...movie} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <Container>
          <SectionTitle
            eyebrow="Planificaci�n"
            title="Pr�ximos estrenos"
            description="Calendario preliminar para cines, partners y licenciatarios."
          />
        </Container>
        <div className="no-scrollbar overflow-x-auto px-6 sm:px-12 lg:px-24">
          <div className="flex min-w-max gap-6">
            {UPCOMING_PLACEHOLDER.map((movie) => (
              <div key={movie.title} className="w-[220px] shrink-0">
                <PosterCard {...movie} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
