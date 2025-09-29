export default function CinePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-widest text-glass-cinema-text-muted">Catalogo</p>
        <h1 className="font-display text-4xl font-semibold text-glass-cinema-text">
          Cartelera actual
        </h1>
        <p className="max-w-2xl text-base text-glass-cinema-text-muted">
          Filtra por estudio, genero o formato para encontrar la pelicula ideal para tu pantalla.
        </p>
      </header>
      <div className="rounded-3xl border border-dashed border-glass-cinema-outline bg-glass-cinema-surface p-12 text-center text-sm text-glass-cinema-text-muted">
        Aca viviran los filtros y el listado dinamico una vez que se integre el CMS.
      </div>
    </main>
  );
}
