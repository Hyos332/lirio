import type { ProductSort, ProductSummary } from "@/lib/commerce/types";

export const PAGE_SIZE = 12;
const MAX_PAGES = 20;

export type SortOption = { value: string; label: string; sort: ProductSort };

const sortOptions = {
  bestSelling: {
    value: "mas-vendidos",
    label: "Más vendidos",
    sort: "best-selling",
  },
  priceAsc: {
    value: "precio-asc",
    label: "Precio: menor a mayor",
    sort: "price-asc",
  },
  priceDesc: {
    value: "precio-desc",
    label: "Precio: mayor a menor",
    sort: "price-desc",
  },
  newest: { value: "nuevos", label: "Más nuevos", sort: "newest" },
  relevance: { value: "relevancia", label: "Relevancia", sort: "relevance" },
} satisfies Record<string, SortOption>;

export const collectionSorts: SortOption[] = [
  sortOptions.bestSelling,
  sortOptions.priceAsc,
  sortOptions.priceDesc,
  sortOptions.newest,
];

export const searchSorts: SortOption[] = [
  sortOptions.relevance,
  sortOptions.priceAsc,
  sortOptions.priceDesc,
];

export type CatalogState = {
  query: string;
  sort: string;
  selected: Record<string, string[]>;
  price: { min: number | null; max: number | null };
  page: number;
};

export type CatalogBase = { path: string; sorts: SortOption[] };

export type FilterGroup =
  | { kind: "price"; key: string; label: string }
  | {
      kind: "list";
      key: string;
      label: string;
      swatches: boolean;
      options: { value: string; label: string; swatch: string | null }[];
    };

export type CatalogData = {
  base: CatalogBase;
  state: CatalogState;
  groups: FilterGroup[];
  products: ProductSummary[];
  totalCount: number | null;
  hasNextPage: boolean;
  awaitingQuery: boolean;
};

const keys = {
  query: "q",
  sort: "orden",
  page: "pagina",
  min: "precio_min",
  max: "precio_max",
};

export function parseAmount(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return null;
  if (!value.trim()) return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

export function readCatalogState(
  params: URLSearchParams,
  base: CatalogBase,
  filterKeys: string[],
): CatalogState {
  const sort = params.get(keys.sort);
  const page = Math.trunc(parseAmount(params.get(keys.page)) ?? 1);

  return {
    query: params.get(keys.query)?.trim() ?? "",
    sort: base.sorts.some((option) => option.value === sort)
      ? sort!
      : base.sorts[0].value,
    selected: Object.fromEntries(
      filterKeys
        .map((key) => [key, params.getAll(key)] as const)
        .filter(([, values]) => values.length > 0),
    ),
    price: {
      min: parseAmount(params.get(keys.min)),
      max: parseAmount(params.get(keys.max)),
    },
    page: Math.min(Math.max(page, 1), MAX_PAGES),
  };
}

export function catalogHref(base: CatalogBase, state: CatalogState) {
  const params = new URLSearchParams();
  if (state.query) params.set(keys.query, state.query);
  for (const [key, values] of Object.entries(state.selected)) {
    for (const value of values) params.append(key, value);
  }
  if (state.price.min !== null) params.set(keys.min, String(state.price.min));
  if (state.price.max !== null) params.set(keys.max, String(state.price.max));
  if (state.sort !== base.sorts[0].value) params.set(keys.sort, state.sort);
  if (state.page > 1) params.set(keys.page, String(state.page));

  const search = params.toString();
  return search ? `${base.path}?${search}` : base.path;
}

export function clearFilters(state: CatalogState): CatalogState {
  return { ...state, selected: {}, price: { min: null, max: null }, page: 1 };
}

export function hasActiveFilters(state: CatalogState) {
  return (
    Object.keys(state.selected).length > 0 ||
    state.price.min !== null ||
    state.price.max !== null
  );
}

export function toggleOption(
  state: CatalogState,
  key: string,
  value: string,
): CatalogState {
  const current = state.selected[key] ?? [];
  const next = current.includes(value)
    ? current.filter((entry) => entry !== value)
    : [...current, value];
  const selected = { ...state.selected, [key]: next };
  if (next.length === 0) delete selected[key];
  return { ...state, selected, page: 1 };
}
