import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-glass-cinema-primary text-gray-950 hover:bg-glass-cinema-secondary focus-visible:ring-glass-cinema-highlight",
  secondary:
    "bg-transparent text-glass-cinema-text border border-glass-cinema-outline hover:border-glass-cinema-primary",
  ghost: "bg-transparent text-glass-cinema-text hover:text-glass-cinema-primary",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {leftIcon ? <span className="text-base">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span className="text-base">{rightIcon}</span> : null}
    </button>
  );
}
