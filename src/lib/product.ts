import type {
  Product,
  ProductVariant,
  SelectedOption,
} from "@/lib/commerce/types";

export const MAX_QUANTITY = 99;

const badgeByTag = [
  ["oferta", "Oferta"],
  ["nuevo", "Nuevo"],
  ["mas-vendido", "Más vendido"],
] as const;

export type SelectedOptions = Record<string, string>;

export function getProductBadge(tags: string[]) {
  return badgeByTag.find(([tag]) => tags.includes(tag))?.[1] ?? null;
}

export function variantParam(id: string) {
  return id.split("/").pop() ?? id;
}

export function toSelectedOptions(variant: ProductVariant): SelectedOptions {
  return Object.fromEntries(
    variant.selectedOptions.map(({ name, value }) => [name, value]),
  );
}

function matches(variant: ProductVariant, options: SelectedOptions) {
  return variant.selectedOptions.every(
    ({ name, value }) => options[name] === value,
  );
}

export function resolveVariant(product: Product, param: string | null) {
  return (
    product.variants.find(
      (variant) => param && variantParam(variant.id) === param,
    ) ??
    product.variants.find((variant) => variant.availableForSale) ??
    product.variants[0]
  );
}

export function isValueAvailable(
  product: Product,
  selected: SelectedOptions,
  name: string,
  value: string,
) {
  const wanted = { ...selected, [name]: value };
  return product.variants.some(
    (variant) => variant.availableForSale && matches(variant, wanted),
  );
}

export function variantFor(
  product: Product,
  selected: SelectedOptions,
  name: string,
  value: string,
) {
  const wanted = { ...selected, [name]: value };
  return (
    product.variants.find((variant) => matches(variant, wanted)) ??
    product.variants.find((variant) =>
      variant.selectedOptions.some(
        (option) => option.name === name && option.value === value,
      ),
    )
  );
}

export function describeOptions(options: SelectedOption[]) {
  return options.map(({ name, value }) => `${name}: ${value}`).join(" · ");
}
