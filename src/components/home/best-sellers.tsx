import { Suspense } from "react";

import {
  ProductGrid,
  ProductGridSkeleton,
} from "@/components/product/product-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { collections } from "@/config/collections";
import { getCollectionProducts } from "@/lib/commerce";
import { getCountry } from "@/lib/country";
import { routes } from "@/lib/routes";

const COUNT = 4;

async function BestSellerGrid() {
  const country = await getCountry();
  const { products } = await getCollectionProducts({
    handle: collections.bestSellers,
    country: country.isoCode,
    sort: "best-selling",
    first: COUNT,
  });
  return <ProductGrid products={products} />;
}

export function BestSellers() {
  return (
    <section aria-labelledby="mas-vendidos">
      <SectionHeading
        id="mas-vendidos"
        title="Más vendidos"
        action={{
          href: routes.collection(collections.bestSellers),
          label: "Ver todos",
        }}
      />
      <div className="mt-6 md:mt-8">
        <Suspense fallback={<ProductGridSkeleton count={COUNT} />}>
          <BestSellerGrid />
        </Suspense>
      </div>
    </section>
  );
}
