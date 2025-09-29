interface StudioPageProps {
  params: {
    studio: string;
  };
}

export default function StudioLanding({ params }: StudioPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-glass-cinema-text-muted">
          Estudio aliado
        </p>
        <h1 className="font-display text-4xl font-semibold text-glass-cinema-text">
          {decodeURIComponent(params.studio)} en Uruguay
        </h1>
        <p className="max-w-2xl text-base text-glass-cinema-text-muted">
          Presentacion de marca, highlights y materiales para el ecosistema local. Se alimentara
          desde WordPress.
        </p>
      </header>
      <section className="rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface p-8 text-sm text-glass-cinema-text-muted">
        Aca agregaremos contenidos especificos del estudio como line up, lineamientos de branding y
        recursos de prensa.
      </section>
    </main>
  );
}
