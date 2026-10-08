import "server-only";

import {
  getCollectionProducts,
  searchProducts,
  type Filter,
  type ProductConnection,
  type ProductFilter,
  type ProductListParams,
  type ProductSummary,
} from "@/lib/commerce";
import { getCountry } from "@/lib/country";
import { routes } from "@/lib/routes";
import { slugify } from "@/lib/text";

import {
  collectionSorts,
  PAGE_SIZE,
  readCatalogState,
  searchSorts,
  type CatalogBase,
  type CatalogData,
  type CatalogState,
  type FilterGroup,
} from "./state";

export type CatalogSource =
  { type: "collection"; handle: string } | { type: "search" };

type PageParams = Omit<ProductListParams, "country">;

function toGroups(filters: Filter[]): FilterGroup[] {
  return filters.map((filter) =>
    filter.type === "price-range"
      ? { kind: "price", key: slugify(filter.label), label: filter.label }
      : {
          kind: "list",
          key: slugify(filter.label),
          label: filter.label,
          swatches: filter.values.some((value) => value.swatch),
          options: filter.values.map((value) => ({
            value: slugify(value.label),
            label: value.label,
            swatch: value.swatch,
          })),
        },
  );
}

function toProductFilters(
  filters: Filter[],
  state: CatalogState,
): ProductFilter[] {
  const selected = filters.flatMap((filter) => {
    const values = state.selected[slugify(filter.label)] ?? [];
    return filter.values
      .filter((value) => values.includes(slugify(value.label)))
      .map((value) => value.input);
  });

  const { min, max } = state.price;
  if (min === null && max === null) return selected;
  return [
    ...selected,
    { price: { min: min ?? undefined, max: max ?? undefined } },
  ];
}

async function fetchPages(
  fetchPage: (params: PageParams) => Promise<ProductConnection>,
  params: Omit<PageParams, "first" | "after">,
  pages: number,
) {
  const products: ProductSummary[] = [];
  let after: string | null = null;
  let last: ProductConnection | null = null;

  for (let page = 0; page < pages; page++) {
    last = await fetchPage({ ...params, first: PAGE_SIZE, after });
    products.push(...last.products);
    if (!last.pageInfo.hasNextPage) break;
    after = last.pageInfo.endCursor;
  }

  return {
    products,
    hasNextPage: last?.pageInfo.hasNextPage ?? false,
    totalCount: last?.totalCount ?? null,
  };
}

export async function loadCatalog(
  source: CatalogSource,
  searchParams: Promise<Record<string, string | string[] | undefined>>,
): Promise<CatalogData> {
  const [rawParams, country] = await Promise.all([searchParams, getCountry()]);
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(rawParams)) {
    for (const entry of [value ?? []].flat()) params.append(key, entry);
  }

  const base: CatalogBase =
    source.type === "collection"
      ? { path: routes.collection(source.handle), sorts: collectionSorts }
      : { path: routes.search, sorts: searchSorts };

  const query = params.get("q")?.trim() ?? "";
  const fetchPage = (pageParams: PageParams) =>
    source.type === "collection"
      ? getCollectionProducts({
          ...pageParams,
          handle: source.handle,
          country: country.isoCode,
        })
      : searchProducts({ ...pageParams, query, country: country.isoCode });

  if (source.type === "search" && !query) {
    return {
      base,
      state: readCatalogState(params, base, []),
      groups: [],
      products: [],
      totalCount: null,
      hasNextPage: false,
      awaitingQuery: true,
    };
  }

  const { filters } = await fetchPage({ first: 1 });
  const groups = toGroups(filters);
  const state = readCatalogState(
    params,
    base,
    groups.filter((group) => group.kind === "list").map((group) => group.key),
  );
  const sort = base.sorts.find((option) => option.value === state.sort)!.sort;
  const result = await fetchPages(
    fetchPage,
    { sort, filters: toProductFilters(filters, state) },
    state.page,
  );

  return {
    base,
    state,
    groups,
    ...result,
    awaitingQuery: false,
  };
}
