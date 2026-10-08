import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type BadgeVariant = "solid" | "count";

const variants: Record<BadgeVariant, string> = {
  solid: "h-6.5 bg-ink px-2.5 text-xs text-white",
  count: "h-4.5 min-w-4.5 bg-accent px-1 text-2xs text-white tabular-nums",
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
        className,
      )}
    >
      {children}
    </span>
  );
}
