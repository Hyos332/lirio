import type { Metadata } from "next";
import { Suspense } from "react";

import { Catalog } from "@/components/catalog/catalog";
import { SearchBox } from "@/components/search/search-box";

export const metadata: Metadata = {
  title: "Buscar",
  robots: { index: false, follow: true },
};

async function SearchBoxWithQuery({
  searchParams,
}: Pick<PageProps<"/buscar">, "searchParams">) {
  const { q } = await searchParams;
  return <SearchBox query={typeof q === "string" ? q : ""} />;
}

export default function SearchPage({ searchParams }: PageProps<"/buscar">) {
  return (
    <Catalog
      source={{ type: "search" }}
      searchParams={searchParams}
      title="Buscar"
      unit={["resultado", "resultados"]}
    >
      <Suspense fallback={<SearchBox />}>
        <SearchBoxWithQuery searchParams={searchParams} />
      </Suspense>
    </Catalog>
  );
}
