export default function BusquedaPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-glass-cinema-text-muted">Busqueda</p>
        <h1 className="font-display text-4xl font-semibold text-glass-cinema-text">
          Encontrar peliculas
        </h1>
        <p className="max-w-2xl text-base text-glass-cinema-text-muted">
          Esta pagina integrara el buscador y filtros avanzados una vez que definamos la tecnologia
          (Algolia o Meilisearch).
        </p>
      </header>
      <div className="rounded-3xl border border-dashed border-glass-cinema-outline bg-glass-cinema-surface p-12 text-center text-sm text-glass-cinema-text-muted">
        Placeholder de buscador con resultados destacados.
      </div>
    </main>
  );
}
