import { cn } from "@/lib/cn";

import { Action, type ActionProps } from "./action";

type TextLinkProps = ActionProps & {
  tone?: "ink" | "muted";
  underline?: boolean;
};

export function TextLink({
  tone = "ink",
  underline = true,
  className,
  ...props
}: TextLinkProps) {
  return (
    <Action
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 transition-colors",
        underline
          ? "underline decoration-1 underline-offset-6 hover:decoration-2"
          : "hover:underline hover:underline-offset-6",
        tone === "ink" ? "text-ink" : "text-muted hover:text-ink",
        className,
      )}
      {...(props as ActionProps)}
    />
  );
}
