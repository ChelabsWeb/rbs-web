export default function LicenciasPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-widest text-glass-cinema-text-muted">
          Licencias y marcas
        </p>
        <h1 className="font-display text-4xl font-semibold text-glass-cinema-text">
          Oportunidades para licenciatarios
        </h1>
        <p className="mx-auto max-w-2xl text-base text-glass-cinema-text-muted">
          Guion de contacto y requisitos basicos para marcas, retailers y partners interesados en
          licenciar contenidos.
        </p>
      </header>
      <section className="rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface p-8 text-sm text-glass-cinema-text-muted">
        En la siguiente iteracion se agregaran formularios y kits descargables segmentados por
        franquicia.
      </section>
    </main>
  );
}
