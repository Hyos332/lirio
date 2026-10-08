"use client";

import type {
  Product,
  ProductOption,
  ProductVariant,
} from "@/lib/commerce/types";
import { cn } from "@/lib/cn";
import {
  isValueAvailable,
  variantFor,
  type SelectedOptions,
} from "@/lib/product";

const focusRing =
  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent";

type OptionGroupProps = {
  product: Product;
  option: ProductOption;
  selected: SelectedOptions;
  onSelect: (variant: ProductVariant) => void;
};

function OptionGroup({
  product,
  option,
  selected,
  onSelect,
}: OptionGroupProps) {
  const swatches = option.values.some((value) => value.swatch);

  return (
    <fieldset className="mt-6">
      <legend className="text-md">
        <span className="font-medium">{option.name}:</span>{" "}
        <span className="text-muted">{selected[option.name]}</span>
      </legend>
      <div className={cn("mt-3 flex flex-wrap", swatches ? "gap-3" : "gap-2")}>
        {option.values.map((value) => {
          const checked = selected[option.name] === value.name;
          const available = isValueAvailable(
            product,
            selected,
            option.name,
            value.name,
          );

          return (
            <label
              key={value.name}
              className="relative cursor-pointer has-disabled:cursor-not-allowed"
            >
              <input
                type="radio"
                name={option.name}
                value={value.name}
                checked={checked}
                disabled={!available && !checked}
                onChange={() => {
                  const variant = variantFor(
                    product,
                    selected,
                    option.name,
                    value.name,
                  );
                  if (variant) onSelect(variant);
                }}
                className="peer sr-only"
              />
              {swatches ? (
                <span
                  aria-hidden
                  style={{ backgroundColor: value.swatch ?? undefined }}
                  className={cn(
                    "block size-11 rounded-pill border border-line-strong ring-ink ring-offset-3 ring-offset-bg transition-shadow peer-checked:ring-2 peer-disabled:opacity-40",
                    focusRing,
                  )}
                />
              ) : (
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex h-11 items-center rounded-pill border border-line-strong px-5 text-md transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-disabled:text-muted-3 peer-disabled:line-through",
                    focusRing,
                  )}
                >
                  {value.name}
                </span>
              )}
              <span className="sr-only">
                {value.name}
                {!available && " (agotado)"}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

type VariantSelectorProps = {
  product: Product;
  selected: SelectedOptions;
  onSelect: (variant: ProductVariant) => void;
};

export function VariantSelector({
  product,
  selected,
  onSelect,
}: VariantSelectorProps) {
  return product.options.map((option) => (
    <OptionGroup
      key={option.name}
      product={product}
      option={option}
      selected={selected}
      onSelect={onSelect}
    />
  ));
}
