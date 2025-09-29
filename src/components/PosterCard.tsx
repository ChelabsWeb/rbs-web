import { Badge } from "./ui/Badge";

interface PosterCardProps {
  title: string;
  releaseDate?: string;
  studio?: string;
}

export function PosterCard({ title, releaseDate, studio }: PosterCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface shadow-glass">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-glass-cinema-surface">
        {studio ? <Badge className="absolute left-4 top-4 bg-black/60">{studio}</Badge> : null}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-black/20 p-4">
          <span className="text-sm text-glass-cinema-text-muted">Visual pendiente</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl text-glass-cinema-text">{title}</h3>
        {releaseDate ? (
          <p className="text-sm text-glass-cinema-text-muted">Estreno: {releaseDate}</p>
        ) : null}
      </div>
    </article>
  );
}
