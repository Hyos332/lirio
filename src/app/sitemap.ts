import type { MetadataRoute } from "next";

import { collections } from "@/config/collections";
import { contentPageHandles } from "@/config/navigation";
import {
  getCollectionProducts,
  getCollections,
  type ProductSummary,
} from "@/lib/commerce";
import { defaultCountry } from "@/lib/country";
import { routes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

const BATCH = 250;
const MAX_BATCHES = 20;

async function allProducts() {
  const products: ProductSummary[] = [];
  let after: string | null = null;

  for (let batch = 0; batch < MAX_BATCHES; batch++) {
    const page = await getCollectionProducts({
      handle: collections.all,
      country: defaultCountry,
      first: BATCH,
      after,
    });
    products.push(...page.products);
    if (!page.pageInfo.hasNextPage) break;
    after = page.pageInfo.endCursor;
  }

  return products;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [collectionList, products] = await Promise.all([
    getCollections(),
    allProducts(),
  ]);

  return [
    { url: absoluteUrl(routes.home), changeFrequency: "daily", priority: 1 },
    ...collectionList.map((collection) => ({
      url: absoluteUrl(routes.collection(collection.handle)),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(routes.product(product.handle)),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...contentPageHandles.map((handle) => ({
      url: absoluteUrl(routes.page(handle)),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];
}
