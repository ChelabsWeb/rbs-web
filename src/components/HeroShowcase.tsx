import type { ReactNode } from "react";
import { GlassPanel } from "./ui/GlassPanel";

interface HeroShowcaseProps {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  media?: ReactNode;
}

export function HeroShowcase({
  title,
  description,
  ctaLabel,
  ctaHref = "#",
  media,
}: HeroShowcaseProps) {
  return (
    <GlassPanel className="grid gap-6 overflow-hidden lg:grid-cols-[2fr_3fr]">
      <div className="space-y-4">
        <p className="font-display text-4xl text-glass-cinema-text">{title}</p>
        <p className="text-base text-glass-cinema-text-muted">{description}</p>
        {ctaLabel ? (
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-glass-cinema-primary px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-glass-cinema-secondary"
          >
            {ctaLabel}
          </a>
        ) : null}
      </div>
      <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black/50">
        {media ?? (
          <div className="flex h-full items-center justify-center text-glass-cinema-text-muted">
            Media placeholder
          </div>
        )}
      </div>
    </GlassPanel>
  );
}
