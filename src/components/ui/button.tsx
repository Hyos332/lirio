import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "accent" | "secondary" | "inverted";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill px-7 font-medium whitespace-nowrap transition-colors select-none disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white hover:bg-ink/85",
  accent: "bg-accent text-white hover:bg-accent/90",
  secondary: "border border-ink text-ink hover:bg-ink/5",
  inverted: "bg-bg text-ink hover:bg-surface-2",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-13 text-md",
  lg: "h-14 text-base",
};

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

function buttonStyles({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: StyleProps = {}) {
  return cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );
}

type OwnProps = StyleProps & { children: ReactNode };

type ButtonAsButton = OwnProps &
  Omit<ComponentProps<"button">, keyof OwnProps> & { href?: undefined };

type ButtonAsLink = OwnProps &
  Omit<ComponentProps<typeof Link>, keyof OwnProps>;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, fullWidth, className, ...rest } = props;
    return (
      <Link
        className={buttonStyles({ variant, size, fullWidth, className })}
        {...rest}
      />
    );
  }

  const {
    variant,
    size,
    fullWidth,
    className,
    type = "button",
    ...rest
  } = props;
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, fullWidth, className })}
      {...rest}
    />
  );
}
