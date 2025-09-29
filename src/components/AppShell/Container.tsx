import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function Container({ as: Component = "div", className, children }: ContainerProps) {
  const ComponentTag = Component as ElementType;
  return (
    <ComponentTag className={cn("mx-auto w-full max-w-6xl px-6 sm:px-10", className)}>
      {children}
    </ComponentTag>
  );
}
