import type { ReactNode } from "react";
import { cn } from "@/utils";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-glass-cinema-outline bg-glass-cinema-surface p-6 shadow-glass",
        className,
      )}
    >
      {children}
    </div>
  );
}
