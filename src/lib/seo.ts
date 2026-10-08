import "server-only";

import { env } from "@/env";
import type { Product } from "@/lib/commerce/types";

import { variantParam } from "./product";
import { routes } from "./routes";

export function absoluteUrl(path: string) {
  return new URL(path, env.NEXT_PUBLIC_SITE_URL).toString();
}

export function productJsonLd(product: Product) {
  const url = absoluteUrl(routes.product(product.handle));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((image) => image.url),
    brand: { "@type": "Brand", name: product.vendor },
    url,
    offers: product.variants.map((variant) => ({
      "@type": "Offer",
      name: variant.title,
      price: variant.price.amount,
      priceCurrency: variant.price.currencyCode,
      availability: variant.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${url}?variant=${variantParam(variant.id)}`,
    })),
  };
}
