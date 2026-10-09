import type { CatalogData } from "@/lib/catalog/state";
import { pluralize } from "@/lib/format";

import { MobileFilters } from "./mobile-filters";
import { SortSelect } from "./sort-select";

export type CountUnit = [singular: string, plural: string];

type CatalogToolbarProps = { data: Promise<CatalogData>; unit: CountUnit };

export async function CatalogToolbar({ data, unit }: CatalogToolbarProps) {
  const { base, state, groups, totalCount, awaitingQuery } = await data;
  if (awaitingQuery) return null;

  return (
    <div className="flex items-center justify-between gap-3 lg:justify-end lg:gap-4">
      <div className="flex items-center gap-3">
        {groups.length > 0 && (
          <div className="lg:hidden">
            <MobileFilters base={base} state={state} groups={groups} />
          </div>
        )}
        {totalCount !== null && (
          <p className="hidden text-md whitespace-nowrap text-muted sm:block">
            {pluralize(totalCount, ...unit)}
          </p>
        )}
      </div>
      <SortSelect base={base} state={state} />
    </div>
  );
}

export function CatalogToolbarSkeleton() {
  return <div aria-hidden className="h-11 w-52 skeleton rounded-pill" />;
}
