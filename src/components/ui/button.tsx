import { cn } from "@/lib/cn";

import { Action, type ActionProps } from "./action";

export type ButtonVariant =
  "primary" | "accent" | "secondary" | "inverted" | "outline-inverted";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-strong hover:shadow-glow",
  accent: "bg-lilac text-ink hover:bg-lilac-2 hover:shadow-glow",
  secondary:
    "border border-line-strong text-ink hover:border-accent hover:text-accent",
  inverted: "bg-lilac text-ink hover:bg-white",
  "outline-inverted":
    "border border-white/30 text-white hover:border-white/60 hover:bg-white/10",
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
        "inline-flex items-center justify-center gap-2 rounded-pill px-7 font-medium whitespace-nowrap transition duration-300 select-none hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...(props as ActionProps)}
    />
  );
}
