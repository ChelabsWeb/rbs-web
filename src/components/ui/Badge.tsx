import type { HTMLAttributes } from "react";
import { cn } from "@/utils";

const styles = {
  default: "bg-glass-cinema-surface text-glass-cinema-text border border-glass-cinema-outline",
  success: "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30",
  warning: "bg-amber-500/15 text-amber-300 border border-amber-400/30",
};

export type BadgeVariant = keyof typeof styles;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs uppercase tracking-widest",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
