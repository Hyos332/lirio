import "server-only";

import { categoryHandles } from "@/config/collections";
import { getCollections } from "@/lib/commerce";

export async function getCategories() {
  const collections = await getCollections();
  return categoryHandles.flatMap(
    (handle) =>
      collections.find((collection) => collection.handle === handle) ?? [],
  );
}
