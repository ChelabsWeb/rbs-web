import type { ReactNode } from "react";
import { cn } from "@/utils";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-glass-cinema-surface p-8 shadow-lg backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}
