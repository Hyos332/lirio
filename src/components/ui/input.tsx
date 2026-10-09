import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type InputProps = Omit<ComponentProps<"input">, "size"> & {
  shape?: "pill" | "rounded";
  size?: "sm" | "md";
};

export function Input({
  shape = "pill",
  size = "md",
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        "w-full min-w-0 border border-line-strong bg-surface text-md text-ink transition-colors placeholder:text-muted-2 hover:border-muted-3 focus:border-accent aria-invalid:border-ink",
        size === "md" ? "h-13 px-5" : "h-11 px-4",
        shape === "pill" ? "rounded-pill" : "rounded-input",
        className,
      )}
      {...props}
    />
  );
}
