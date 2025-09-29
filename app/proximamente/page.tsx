export default function ProximamentePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-widest text-glass-cinema-text-muted">Calendario</p>
        <h1 className="font-display text-4xl font-semibold text-glass-cinema-text">
          Proximos estrenos
        </h1>
        <p className="mx-auto max-w-2xl text-base text-glass-cinema-text-muted">
          Un vistazo rapido a los lanzamientos confirmados. Muy pronto se conectara al feed de
          WordPress.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {[...new Array(4)].map((_, index) => (
          <article
            key={index}
            className="rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface p-6 text-left"
          >
            <span className="text-xs uppercase tracking-widest text-glass-cinema-text-muted">
              Mes {index + 1}
            </span>
            <h2 className="mt-3 font-display text-2xl text-glass-cinema-text">Titulo pendiente</h2>
            <p className="mt-2 text-sm text-glass-cinema-text-muted">
              Datos finales del estreno se poblaran desde el CMS en la proxima etapa.
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
