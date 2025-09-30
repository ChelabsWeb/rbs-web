import Image from "next/image";
import Link from "next/link";

import { cn } from "@/utils";
import { Badge } from "./ui/Badge";

interface PosterCardProps {
  title: string;
  releaseDate?: string;
  studio?: string;
  posterUrl?: string;
  href?: string;
  className?: string;
}

export function PosterCard({ title, releaseDate, studio, posterUrl, href, className }: PosterCardProps) {
  const content = (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface shadow-glass transition hover:-translate-y-1 hover:shadow-xl",
        className,
      )}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-glass-cinema-surface">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={`Poster de ${title}`}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 220px, 60vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-glass-cinema-outline/20">
            <span className="text-xs text-glass-cinema-text-muted">Poster pendiente</span>
          </div>
        )}
        {studio ? <Badge className="absolute left-4 top-4 bg-black/60">{studio}</Badge> : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl text-glass-cinema-text">{title}</h3>
        {releaseDate ? (
          <p className="text-sm text-glass-cinema-text-muted">Estreno: {releaseDate}</p>
        ) : null}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
