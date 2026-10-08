import { Suspense, type ReactNode } from "react";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { loadCatalog, type CatalogSource } from "@/lib/catalog/load";
import { routes } from "@/lib/routes";

import { CatalogResults, CatalogResultsSkeleton } from "./catalog-results";
import {
  CatalogToolbar,
  CatalogToolbarSkeleton,
  type CountUnit,
} from "./catalog-toolbar";

type CatalogProps = {
  source: CatalogSource;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  title: string;
  description?: string;
  unit: CountUnit;
  children?: ReactNode;
};

export function Catalog({
  source,
  searchParams,
  title,
  description,
  unit,
  children,
}: CatalogProps) {
  const data = loadCatalog(source, searchParams);

  return (
    <Container className="pt-6 pb-16 lg:pt-10 lg:pb-24">
      <Breadcrumbs
        items={[{ title: "Inicio", href: routes.home }, { title }]}
      />
      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-h2-sm md:text-h1">{title}</h1>
          {description && (
            <p className="mt-3 max-w-2xl text-md text-muted lg:text-base">
              {description}
            </p>
          )}
          {children}
        </div>
        <Suspense fallback={<CatalogToolbarSkeleton />}>
          <CatalogToolbar data={data} unit={unit} />
        </Suspense>
      </div>
      <Suspense fallback={<CatalogResultsSkeleton />}>
        <CatalogResults data={data} />
      </Suspense>
    </Container>
  );
}
