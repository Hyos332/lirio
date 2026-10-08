import { cn } from "@/lib/cn";

import { Action, type ActionProps } from "./action";

export type ButtonVariant = "primary" | "accent" | "secondary" | "inverted";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white hover:bg-ink/85",
  accent: "bg-accent text-white hover:bg-accent/90",
  secondary: "border border-ink text-ink hover:bg-ink/5",
  inverted: "bg-bg text-ink hover:bg-surface-2",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-11 text-md",
  md: "h-13 text-md",
  lg: "h-14 text-base",
};

export type ButtonProps = ActionProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <Action
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill px-7 font-medium whitespace-nowrap transition select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...(props as ActionProps)}
    />
  );
}
