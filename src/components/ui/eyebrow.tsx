import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  tone?: "accent" | "light";
  className?: string;
};

export function Eyebrow({
  children,
  tone = "accent",
  className,
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs font-medium tracking-widest uppercase",
        tone === "accent" ? "text-accent" : "text-lilac-2",
        className,
      )}
    >
      {children}
    </p>
  );
}
