import { store } from "@/config/store";
import { normalizeText } from "@/lib/text";

import type { ProductListParams } from "../provider";
import type {
  Collection,
  Filter,
  FilterValue,
  Money,
  Product,
  ProductConnection,
  ProductFilter,
  ProductSort,
  ProductSummary,
  ProductVariant,
} from "../types";
import {
  currencyFor,
  data,
  findCollection,
  type MockCollection,
  type MockProduct,
  type MockVariant,
} from "./data";

const PAGE_SIZE = 12;

const money = (amount: string, currencyCode: string): Money => ({
  amount,
  currencyCode,
});

export function toCollection(collection: MockCollection): Collection {
  return {
    id: collection.handle,
    handle: collection.handle,
    title: collection.title,
    description: collection.description,
    image: null,
    seo: { title: collection.title, description: collection.description },
  };
}

export function toSummary(
  product: MockProduct,
  currencyCode: string,
): ProductSummary {
  return {
    id: product.handle,
    handle: product.handle,
    title: product.title,
    subtitle: product.subtitle ?? null,
    productType: product.productType,
    tags: product.tags,
    availableForSale: product.variants.some((variant) => variant.available),
    featuredImage: null,
    price: money(product.price, currencyCode),
    compareAtPrice: product.compareAtPrice
      ? money(product.compareAtPrice, currencyCode)
      : null,
  };
}

export function toVariant(
  product: MockProduct,
  variant: MockVariant,
  currencyCode: string,
): ProductVariant {
  const { price, compareAtPrice } = toSummary(product, currencyCode);
  const selectedOptions = Object.entries(variant.options).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );

  return {
    id: variant.id,
    title:
      selectedOptions.map((option) => option.value).join(" / ") ||
      product.title,
    availableForSale: variant.available,
    selectedOptions,
    price,
    compareAtPrice,
    image: null,
  };
}

export function toProduct(product: MockProduct, currencyCode: string): Product {
  const collection = findCollection(product.category);
  const features = product.features
    .map((feature) => `<li>${feature}</li>`)
    .join("");

  return {
    ...toSummary(product, currencyCode),
    vendor: store.name,
    description: product.description,
    descriptionHtml: `<ul>${features}</ul>`,
    images: [],
    options: product.options.map((option) => ({
      name: option.name,
      values: option.values.map((name) => ({
        name,
        swatch: data.swatches[name] ?? null,
      })),
    })),
    variants: product.variants.map((variant) =>
      toVariant(product, variant, currencyCode),
    ),
    specifications: product.specifications,
    collection: collection
      ? { handle: collection.handle, title: collection.title }
      : null,
    seo: { title: product.title, description: product.description },
  };
}

export function belongsTo(product: MockProduct, { rule }: MockCollection) {
  return (
    (!rule.category || product.category === rule.category) &&
    (!rule.tag || product.tags.includes(rule.tag))
  );
}

function matchesFilter(product: MockProduct, filter: ProductFilter) {
  if ("available" in filter) {
    return (
      product.variants.some((variant) => variant.available) === filter.available
    );
  }
  if ("price" in filter) {
    const price = Number(product.price);
    return (
      price >= (filter.price.min ?? 0) &&
      price <= (filter.price.max ?? Infinity)
    );
  }
  if ("productType" in filter)
    return product.productType === filter.productType;
  if ("tag" in filter) return product.tags.includes(filter.tag);

  const { name, value } = filter.variantOption;
  return product.variants.some((variant) => variant.options[name] === value);
}

function filterGroup(filter: ProductFilter) {
  return "variantOption" in filter
    ? `variantOption:${filter.variantOption.name}`
    : Object.keys(filter)[0];
}

function applyFilters(products: MockProduct[], filters: ProductFilter[]) {
  const groups = Map.groupBy(filters, filterGroup);
  return products.filter((product) =>
    [...groups.values()].every((group) =>
      group.some((filter) => matchesFilter(product, filter)),
    ),
  );
}

const comparators: Record<
  ProductSort,
  ((a: MockProduct, b: MockProduct) => number) | null
> = {
  relevance: null,
  "best-selling": (a, b) => a.bestSellingRank - b.bestSellingRank,
  "price-asc": (a, b) => Number(a.price) - Number(b.price),
  "price-desc": (a, b) => Number(b.price) - Number(a.price),
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
};

function sortProducts(
  products: MockProduct[],
  sort: ProductSort = "relevance",
) {
  const compare = comparators[sort];
  return compare ? products.toSorted(compare) : products;
}

function listFilter(
  id: string,
  label: string,
  products: MockProduct[],
  values: Pick<FilterValue, "label" | "input" | "swatch">[],
): Filter {
  return {
    id,
    label,
    type: "list",
    values: values
      .map((value) => ({
        ...value,
        id: `${id}.${value.label}`,
        count: products.filter((product) => matchesFilter(product, value.input))
          .length,
      }))
      .filter((value) => value.count > 0),
  };
}

function buildFilters(products: MockProduct[]): Filter[] {
  const unique = (values: string[]) => [...new Set(values)];
  const optionNames = unique(
    products.flatMap((product) => product.options.map((o) => o.name)),
  );
  const maxPrice = Math.max(
    0,
    ...products.map((product) => Number(product.price)),
  );

  const filters: Filter[] = [
    listFilter(
      "filter.p.product_type",
      "Tipo",
      products,
      unique(products.map((product) => product.productType)).map(
        (productType) => ({
          label: productType,
          input: { productType },
          swatch: null,
        }),
      ),
    ),
    {
      id: "filter.v.price",
      label: "Precio",
      type: "price-range",
      values: [
        {
          id: "filter.v.price",
          label: "Precio",
          count: products.length,
          input: { price: { min: 0, max: maxPrice } },
          swatch: null,
        },
      ],
    },
    ...optionNames.map((name) =>
      listFilter(
        `filter.v.option.${name.toLowerCase()}`,
        name,
        products,
        unique(
          products.flatMap(
            (product) =>
              product.options.find((option) => option.name === name)?.values ??
              [],
          ),
        ).map((value) => ({
          label: value,
          input: { variantOption: { name, value } },
          swatch: data.swatches[value] ?? null,
        })),
      ),
    ),
    listFilter(
      "filter.p.tag",
      data.tagFilter.label,
      products,
      data.tagFilter.tags.map(({ tag, label }) => ({
        label,
        input: { tag },
        swatch: null,
      })),
    ),
  ];

  return filters.filter((filter) => filter.values.length > 0);
}

export function listProducts(
  source: MockProduct[],
  { country, sort, filters = [], first = PAGE_SIZE, after }: ProductListParams,
): ProductConnection {
  const currencyCode = currencyFor(country);
  const matching = sortProducts(applyFilters(source, filters), sort);
  const start = after ? Number(after) : 0;
  const page = matching.slice(start, start + first);
  const end = start + page.length;

  return {
    products: page.map((product) => toSummary(product, currencyCode)),
    filters: buildFilters(source),
    pageInfo: {
      hasNextPage: end < matching.length,
      endCursor: page.length > 0 ? String(end) : null,
    },
    totalCount: matching.length,
  };
}

export function searchCatalog(query: string) {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean);
  return data.products.filter((product) => {
    const haystack = normalizeText(
      [
        product.title,
        product.productType,
        product.description,
        ...product.tags,
      ].join(" "),
    );
    return terms.every((term) => haystack.includes(term));
  });
}

export function recommend(product: MockProduct, limit = 4) {
  const sameCategory = (candidate: MockProduct) =>
    Number(candidate.category === product.category);
  return data.products
    .filter((candidate) => candidate.handle !== product.handle)
    .toSorted(
      (a, b) =>
        sameCategory(b) - sameCategory(a) ||
        a.bestSellingRank - b.bestSellingRank,
    )
    .slice(0, limit);
}
