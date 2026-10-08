import {
  ProductGrid,
  ProductGridSkeleton,
} from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { collections } from "@/config/collections";
import {
  catalogHref,
  clearFilters,
  hasActiveFilters,
  type CatalogData,
} from "@/lib/catalog/state";
import { routes } from "@/lib/routes";

import { FilterPanel } from "./filter-panel";

const layoutClassName =
  "mt-8 grid min-h-[70dvh] content-start gap-10 lg:mt-10 lg:grid-cols-[220px_1fr]";

function EmptyState({ data }: { data: CatalogData }) {
  const filtered = hasActiveFilters(data.state);

  return (
    <div className="flex flex-col items-center rounded-card border border-line bg-surface px-6 py-16 text-center">
      <p className="text-lg font-medium">
        {filtered
          ? "No encontramos productos con esos filtros"
          : data.state.query
            ? `No encontramos resultados para “${data.state.query}”`
            : "Todavía no hay productos aquí"}
      </p>
      <p className="mt-2 max-w-sm text-md text-muted">
        {filtered
          ? "Prueba quitando algún filtro o ampliando el rango de precio."
          : "Explora el catálogo completo para encontrar algo que te guste."}
      </p>
      <Button
        href={
          filtered
            ? catalogHref(data.base, clearFilters(data.state))
            : routes.collection(collections.all)
        }
        variant="secondary"
        className="mt-8"
      >
        {filtered ? "Limpiar filtros" : "Ver todos los productos"}
      </Button>
    </div>
  );
}

export async function CatalogResults({ data }: { data: Promise<CatalogData> }) {
  const catalog = await data;

  if (catalog.awaitingQuery) {
    return (
      <p className="mt-10 text-md text-muted">
        Escribe el nombre de un producto o una categoría para empezar.
      </p>
    );
  }

  return (
    <div className={layoutClassName}>
      <aside aria-label="Filtros" className="hidden lg:block">
        <FilterPanel
          base={catalog.base}
          state={catalog.state}
          groups={catalog.groups}
        />
      </aside>
      <div>
        <h2 className="sr-only">Productos</h2>
        {catalog.products.length > 0 ? (
          <>
            <ProductGrid products={catalog.products} columns={3} />
            {catalog.hasNextPage && (
              <div className="mt-12 flex justify-center">
                <Button
                  href={catalogHref(catalog.base, {
                    ...catalog.state,
                    page: catalog.state.page + 1,
                  })}
                  scroll={false}
                  variant="secondary"
                >
                  Cargar más productos
                </Button>
              </div>
            )}
          </>
        ) : (
          <EmptyState data={catalog} />
        )}
      </div>
    </div>
  );
}

export function CatalogResultsSkeleton() {
  return (
    <div aria-hidden className={layoutClassName}>
      <div className="hidden flex-col gap-4 lg:flex">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-5 w-3/4 animate-pulse rounded-pill bg-surface-2"
          />
        ))}
      </div>
      <ProductGridSkeleton count={6} columns={3} />
    </div>
  );
}
