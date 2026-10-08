import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

import { Icon } from "./icon";

export function Select({
  className,
  children,
  ...props
}: ComponentProps<"select">) {
  return (
    <span className={cn("relative inline-flex", className)}>
      <select
        className="h-11 w-full cursor-pointer appearance-none rounded-pill border border-line-strong bg-surface pr-10 pl-4 text-sm text-ink"
        {...props}
      >
        {children}
      </select>
      <Icon
        name="chevron-down"
        size={16}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
      />
    </span>
  );
}
