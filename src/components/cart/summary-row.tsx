import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SummaryRowProps = {
  label: string;
  children: ReactNode;
  emphasis?: boolean;
};

export function SummaryRow({
  label,
  children,
  emphasis = false,
}: SummaryRowProps) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4",
        emphasis ? "text-lg font-medium" : "text-md text-ink-2",
      )}
    >
      <dt>{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}
