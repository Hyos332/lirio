import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type BadgeVariant = "solid" | "count";

const variants: Record<BadgeVariant, string> = {
  /** Etiquetas de producto: "Más vendido", "Nuevo", "Oferta". */
  solid: "h-6.5 px-2.5 text-xs",
  /** Contador circular del carrito. */
  count: "h-4.5 min-w-4.5 px-1 text-2xs tabular-nums",
};

const tones: Record<BadgeVariant, string> = {
  solid: "bg-ink text-white",
  count: "bg-accent text-white",
};

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "solid", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-pill font-medium whitespace-nowrap",
        variants[variant],
        tones[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
