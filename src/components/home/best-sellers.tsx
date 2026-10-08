import { Suspense, type ReactNode } from "react";

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

function Section({ children }: { children: ReactNode }) {
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
      <div className="mt-6 md:mt-8">{children}</div>
    </section>
  );
}

async function BestSellerSection() {
  const country = await getCountry();
  const { products } = await getCollectionProducts({
    handle: collections.bestSellers,
    country: country.isoCode,
    sort: "best-selling",
    first: COUNT,
  });
  if (products.length === 0) return null;

  return (
    <Section>
      <ProductGrid products={products} />
    </Section>
  );
}

export function BestSellers() {
  return (
    <Suspense
      fallback={
        <Section>
          <ProductGridSkeleton count={COUNT} />
        </Section>
      }
    >
      <BestSellerSection />
    </Suspense>
  );
}
