import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Catalog } from "@/components/catalog/catalog";
import { CategoryChips } from "@/components/collection/category-chips";
import { getCategories } from "@/lib/categories";
import { getCollection, getCollections } from "@/lib/commerce";

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection) => ({ handle: collection.handle }));
}

export async function generateMetadata({
  params,
}: PageProps<"/colecciones/[handle]">): Promise<Metadata> {
  const collection = await getCollection((await params).handle);
  if (!collection) return {};
  return {
    title: collection.seo.title || collection.title,
    description: collection.seo.description || collection.description,
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: PageProps<"/colecciones/[handle]">) {
  const { handle } = await params;
  const [collection, categories] = await Promise.all([
    getCollection(handle),
    getCategories(),
  ]);
  if (!collection) notFound();

  return (
    <Catalog
      source={{ type: "collection", handle }}
      searchParams={searchParams}
      title={collection.title}
      description={collection.description}
      unit={["producto", "productos"]}
    >
      <CategoryChips
        categories={categories}
        activeHandle={handle}
        className="mt-6 lg:hidden"
      />
    </Catalog>
  );
}
