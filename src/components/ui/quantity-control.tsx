"use client";

import { cn } from "@/lib/cn";
import { MAX_QUANTITY } from "@/lib/product";

import { Icon } from "./icon";

const sizes = {
  sm: { group: "h-12", button: "w-11" },
  md: { group: "h-14", button: "w-13" },
};

type QuantityControlProps = {
  value: number;
  onChange: (value: number) => void;
  size?: keyof typeof sizes;
  disabled?: boolean;
  label?: string;
};

export function QuantityControl({
  value,
  onChange,
  size = "md",
  disabled = false,
  label = "Cantidad",
}: QuantityControlProps) {
  const buttonClassName = cn(
    "flex h-full items-center justify-center rounded-pill transition-colors hover:bg-ink/5 disabled:pointer-events-none disabled:opacity-40",
    sizes[size].button,
  );

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex shrink-0 items-center rounded-pill border border-line-strong bg-surface",
        sizes[size].group,
      )}
    >
      <button
        type="button"
        aria-label="Disminuir cantidad"
        disabled={disabled || value <= 1}
        onClick={() => onChange(value - 1)}
        className={buttonClassName}
      >
        <Icon name="minus" size={16} />
      </button>
      <output
        aria-live="polite"
        className="w-7 text-center text-md font-medium tabular-nums"
      >
        {value}
      </output>
      <button
        type="button"
        aria-label="Aumentar cantidad"
        disabled={disabled || value >= MAX_QUANTITY}
        onClick={() => onChange(value + 1)}
        className={buttonClassName}
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
