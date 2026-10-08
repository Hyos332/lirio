"use client";

import { Select } from "@/components/ui/select";
import type { CatalogBase, CatalogState } from "@/lib/catalog/state";

import { useCatalogNavigation } from "./use-catalog-navigation";

export function SortSelect({
  base,
  state,
}: {
  base: CatalogBase;
  state: CatalogState;
}) {
  const { current, navigate } = useCatalogNavigation(base, state);

  return (
    <Select
      aria-label="Ordenar por"
      value={current.sort}
      onChange={(event) =>
        navigate({ ...current, sort: event.target.value, page: 1 })
      }
      className="w-48 sm:w-52"
    >
      {base.sorts.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
