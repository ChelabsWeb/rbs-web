interface PeliculaPageProps {
  params: {
    slug: string;
  };
}

export default function PeliculaPage({ params }: PeliculaPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-glass-cinema-text-muted">
          Ficha tecnica
        </p>
        <h1 className="font-display text-4xl font-semibold text-glass-cinema-text">
          Pelicula: {decodeURIComponent(params.slug)}
        </h1>
        <p className="max-w-2xl text-base text-glass-cinema-text-muted">
          Esta pantalla mostrara sinopsis, trailer, fichas tecnicas y materiales descargables desde
          el CMS.
        </p>
      </header>
      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4 rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface p-8">
          <h2 className="font-display text-2xl text-glass-cinema-text">Sinopsis</h2>
          <p className="text-sm leading-6 text-glass-cinema-text-muted">
            Placeholder de contenido. Proximamente se poblara con informacion real proveniente del
            CMS.
          </p>
        </div>
        <aside className="space-y-4 rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface p-6">
          <h2 className="font-display text-xl text-glass-cinema-text">Datos rapidos</h2>
          <ul className="space-y-2 text-sm text-glass-cinema-text-muted">
            <li>Genero pendiente</li>
            <li>Duracion pendiente</li>
            <li>Distribucion: RBS</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
