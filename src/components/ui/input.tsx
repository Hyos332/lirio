import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type InputProps = ComponentProps<"input"> & { shape?: "pill" | "rounded" };

export function Input({ shape = "pill", className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-13 w-full min-w-0 border border-line-strong bg-surface px-5 text-md text-ink transition-colors placeholder:text-muted-2 hover:border-muted-3 aria-invalid:border-ink",
        shape === "pill" ? "rounded-pill" : "rounded-input",
        className,
      )}
      {...props}
    />
  );
}
