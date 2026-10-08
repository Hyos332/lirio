import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-xs tracking-wide text-accent uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
