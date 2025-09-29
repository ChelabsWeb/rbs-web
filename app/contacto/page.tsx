export default function ContactoPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-widest text-glass-cinema-text-muted">Contacto</p>
        <h1 className="font-display text-4xl font-semibold text-glass-cinema-text">
          Hablemos de tu proyecto
        </h1>
        <p className="mx-auto max-w-2xl text-base text-glass-cinema-text-muted">
          Pronto integraremos formularios y automatizaciones para cada tipo de partner. Por ahora,
          dejamos los datos clave.
        </p>
      </header>
      <section className="grid gap-6 rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface p-10 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-xl text-glass-cinema-text">Equipo comercial</h2>
          <p className="mt-4 text-sm text-glass-cinema-text-muted">comercial@rbs.com.uy</p>
        </div>
        <div>
          <h2 className="font-display text-xl text-glass-cinema-text">Marketing y prensa</h2>
          <p className="mt-4 text-sm text-glass-cinema-text-muted">marketing@rbs.com.uy</p>
        </div>
      </section>
    </main>
  );
}
