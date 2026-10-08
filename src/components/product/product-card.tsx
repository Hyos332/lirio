import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Picture } from "@/components/ui/picture";
import { Price } from "@/components/ui/price";
import type { ProductSummary } from "@/lib/commerce/types";
import { getProductBadge } from "@/lib/product";
import { routes } from "@/lib/routes";

const imageClassName = "h-48 rounded-card md:h-75";

export function ProductCard({ product }: { product: ProductSummary }) {
  const badge = getProductBadge(product.tags);

  return (
    <Link href={routes.product(product.handle)} className="group block">
      <div className="relative">
        <Picture
          image={product.featuredImage}
          alt=""
          placeholder="Foto producto"
          tone="surface"
          fit="contain"
          sizes="(min-width: 1024px) 25vw, 50vw"
          className={`${imageClassName} border border-line transition-colors group-hover:border-line-strong`}
        />
        {badge && <Badge className="absolute top-4 left-4">{badge}</Badge>}
      </div>
      <p className="mt-4 hidden text-xs text-muted sm:block">
        {product.productType}
      </p>
      <h3 className="mt-3 text-md font-medium sm:mt-1 sm:text-base">
        {product.title}
      </h3>
      <Price
        price={product.price}
        compareAt={product.compareAtPrice}
        size="md"
        className="mt-2"
      />
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className={`${imageClassName} bg-surface-2`} />
      <div className="mt-4 h-4 w-2/3 rounded-pill bg-surface-2" />
      <div className="mt-3 h-4 w-1/3 rounded-pill bg-surface-2" />
    </div>
  );
}
