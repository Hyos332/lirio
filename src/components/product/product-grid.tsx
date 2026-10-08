import type { ProductSummary } from "@/lib/commerce/types";
import { cn } from "@/lib/cn";

import { ProductCard, ProductCardSkeleton } from "./product-card";

type Columns = 3 | 4;

function gridClassName(columns: Columns) {
  return cn(
    "grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-10",
    columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
  );
}

type ProductGridProps = { products: ProductSummary[]; columns?: Columns };

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  return (
    <ul className={gridClassName(columns)}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

export function ProductGridSkeleton({
  count,
  columns = 4,
}: {
  count: number;
  columns?: Columns;
}) {
  return (
    <ul className={gridClassName(columns)}>
      {Array.from({ length: count }, (_, index) => (
        <li key={index}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
