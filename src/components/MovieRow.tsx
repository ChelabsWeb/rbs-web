import { PosterCard } from "./PosterCard";

interface MovieRowProps {
  title: string;
  description?: string;
  items?: Array<{
    title: string;
    releaseDate?: string;
    studio?: string;
  }>;
}

export function MovieRow({ title, description, items }: MovieRowProps) {
  const data =
    items ??
    Array.from({ length: 5 }, (_, index) => ({
      title: `Titulo ${index + 1}`,
      releaseDate: "Por confirmar",
    }));

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="font-display text-2xl text-glass-cinema-text">{title}</h2>
        {description ? <p className="text-sm text-glass-cinema-text-muted">{description}</p> : null}
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {data.map((item) => (
          <PosterCard key={`${item.title}-${item.releaseDate}`} {...item} />
        ))}
      </div>
    </section>
  );
}
