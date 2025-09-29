import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative isolate flex flex-1 flex-col gap-12 px-6 py-16 sm:px-12 lg:px-24">
      <section className="max-w-3xl space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-glass-cinema-outline bg-glass-cinema-surface px-4 py-1 text-sm uppercase tracking-widest text-glass-cinema-text-muted">
          Estrenos y catalogo RBS
        </span>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-glass-cinema-primary sm:text-6xl">
          El cine que mueve a Uruguay.
        </h1>
        <p className="max-w-xl text-lg text-glass-cinema-text-muted">
          RBS distribuye los estrenos de los grandes estudios internacionales para todo el
          territorio. Descubri los proximos lanzamientos, descargate materiales oficiales y
          conectate con nuestro equipo.
        </p>
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
            Habla con nosotros
          </Link>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Peliculas activas", value: "45" },
          { label: "Cines asociados", value: "20" },
          { label: "Estrenos 2025", value: "35" },
          { label: "A�os de trayectoria", value: "25" },
        ].map((item) => (
          <article
            key={item.label}
            className="rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface p-6 shadow-glass backdrop-blur"
          >
            <p className="text-sm uppercase tracking-wide text-glass-cinema-text-muted">
              {item.label}
            </p>
            <p className="mt-2 font-display text-3xl font-semibold text-glass-cinema-text">
              {item.value}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
