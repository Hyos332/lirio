import { CatalogResultsSkeleton } from "@/components/catalog/catalog-results";
import { CatalogToolbarSkeleton } from "@/components/catalog/catalog-toolbar";
import { Container } from "@/components/ui/container";

const block = "skeleton rounded-pill";

export function CatalogPageSkeleton() {
  return (
    <Container aria-busy className="pt-6 pb-16 lg:pt-10 lg:pb-24">
      <div className={`h-4 w-32 ${block}`} />
      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className={`h-12 w-56 ${block}`} />
          <div className={`mt-4 h-5 w-80 max-w-full ${block}`} />
        </div>
        <CatalogToolbarSkeleton />
      </div>
      <CatalogResultsSkeleton />
    </Container>
  );
}

export function CartSkeleton() {
  return (
    <div aria-busy>
      <div className={`h-12 w-64 ${block}`} />
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_405px]">
        <div className="flex flex-col gap-6">
          {[0, 1].map((index) => (
            <div key={index} className="flex gap-6">
              <div className="size-24 skeleton rounded-card-sm sm:size-35" />
              <div className={`mt-4 h-5 flex-1 ${block}`} />
            </div>
          ))}
        </div>
        <div className="h-96 skeleton rounded-panel" />
      </div>
    </div>
  );
}

export function CartPageSkeleton() {
  return (
    <Container className="pt-8 pb-16 lg:pt-14 lg:pb-24">
      <CartSkeleton />
    </Container>
  );
}
