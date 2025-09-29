interface FiltersBarProps {
  onChange?: (filters: Record<string, string>) => void;
}

export function FiltersBar({ onChange }: FiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface p-4 text-sm text-glass-cinema-text-muted">
      <span className="font-semibold text-glass-cinema-text">Filtros activos</span>
      <button
        type="button"
        className="rounded-full border border-glass-cinema-outline px-4 py-2 transition hover:border-glass-cinema-primary hover:text-glass-cinema-primary"
        onClick={() => onChange?.({ periodo: "estrenos" })}
      >
        Estrenos 2025
      </button>
      <button
        type="button"
        className="rounded-full border border-glass-cinema-outline px-4 py-2 transition hover:border-glass-cinema-primary hover:text-glass-cinema-primary"
        onClick={() => onChange?.({ formato: "imax" })}
      >
        Formato IMAX
      </button>
    </div>
  );
}
