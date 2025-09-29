import type { ReactNode } from "react";
import { cn } from "@/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  action,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}
    >
      <div className="space-y-3">
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-glass-cinema-text-muted">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="font-display text-3xl font-semibold text-glass-cinema-text sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm text-glass-cinema-text-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
