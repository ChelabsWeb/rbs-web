import { PosterCard } from "./PosterCard";

interface MovieGridItem {
  title: string;
  releaseDate?: string;
  studio?: string;
  posterUrl?: string;
  href?: string;
}

interface MovieGridProps {
  items?: MovieGridItem[];
}

export function MovieGrid({ items }: MovieGridProps) {
  const data =
    items ??
    Array.from({ length: 6 }, (_, index) => ({
      title: `Pelicula ${index + 1}`,
      releaseDate: "Pendiente",
      studio: index % 2 === 0 ? "Disney" : "Universal",
    }));

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <PosterCard key={`${item.title}-${item.releaseDate}`} {...item} />
      ))}
    </div>
  );
}
