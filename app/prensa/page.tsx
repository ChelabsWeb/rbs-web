export default function PrensaPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-widest text-glass-cinema-text-muted">Prensa</p>
        <h1 className="font-display text-4xl font-semibold text-glass-cinema-text">
          Materiales oficiales
        </h1>
        <p className="mx-auto max-w-2xl text-base text-glass-cinema-text-muted">
          Kits de prensa, stills y trailers se sincronizaran automaticamente con WordPress en
          proximas iteraciones.
        </p>
      </header>
      <section className="rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface p-8 text-sm text-glass-cinema-text-muted">
        Espacio reservado para embed de presskits y boton de solicitud de entrevistas.
      </section>
    </main>
  );
}
