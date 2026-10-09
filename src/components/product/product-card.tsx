import Link from "next/link";
import { ViewTransition } from "react";

import { Badge } from "@/components/ui/badge";
import { Picture } from "@/components/ui/picture";
import { Price } from "@/components/ui/price";
import type { ProductSummary } from "@/lib/commerce/types";
import { getProductBadge, morphName } from "@/lib/product";
import { routes } from "@/lib/routes";

const imageClassName = "h-48 rounded-card rounded-bl-checkbox md:h-75";

export function ProductCard({ product }: { product: ProductSummary }) {
  const badge = getProductBadge(product.tags);

  return (
    <Link href={routes.product(product.handle)} className="group block">
      <div className="relative transition duration-500 group-hover:-translate-y-1.5">
        <ViewTransition
          name={morphName(product.handle)}
          share="morph"
          default="none"
        >
          <Picture
            image={product.featuredImage}
            alt=""
            placeholder="Foto producto"
            tone="surface-2"
            fit="contain"
            sizes="(min-width: 1024px) 25vw, 50vw"
            className={`${imageClassName} transition-shadow duration-500 group-hover:shadow-lift [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-[1.05]`}
          />
        </ViewTransition>
        {badge && (
          <Badge variant={badge.variant} className="absolute top-4 left-4">
            {badge.label}
          </Badge>
        )}
      </div>
      <h3 className="mt-3 text-md font-medium transition-colors group-hover:text-accent sm:mt-4 sm:text-base">
        {product.title}
      </h3>
      {product.subtitle && (
        <p className="mt-1 hidden text-xs text-muted sm:block">
          {product.subtitle}
        </p>
      )}
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
    <div aria-hidden>
      <div className={`${imageClassName} skeleton`} />
      <div className="mt-4 h-4 w-2/3 skeleton rounded-pill" />
      <div className="mt-3 h-4 w-1/3 skeleton rounded-pill" />
    </div>
  );
}
