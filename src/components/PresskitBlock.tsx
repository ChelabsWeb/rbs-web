interface PresskitBlockProps {
  title: string;
  description: string;
  downloadUrl?: string;
}

export function PresskitBlock({ title, description, downloadUrl }: PresskitBlockProps) {
  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface p-6">
      <header className="space-y-2">
        <h3 className="font-display text-2xl text-glass-cinema-text">{title}</h3>
        <p className="text-sm text-glass-cinema-text-muted">{description}</p>
      </header>
      {downloadUrl ? (
        <a
          href={downloadUrl}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-glass-cinema-outline px-4 py-2 text-sm font-semibold text-glass-cinema-text transition hover:border-glass-cinema-primary"
        >
          Descargar presskit
        </a>
      ) : (
        <span className="text-xs uppercase tracking-wide text-glass-cinema-text-muted">
          Archivos disponibles en la proxima iteracion
        </span>
      )}
    </article>
  );
}
