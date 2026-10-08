import { Suspense } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { getProductRecommendations } from "@/lib/commerce";
import { getCountry } from "@/lib/country";

import { ProductGrid } from "./product-grid";

async function RecommendationList({ productId }: { productId: string }) {
  const country = await getCountry();
  const products = await getProductRecommendations({
    productId,
    country: country.isoCode,
  });
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="recomendados" className="mt-20 lg:mt-24">
      <SectionHeading id="recomendados" title="También te puede gustar" />
      <div className="mt-6 md:mt-8">
        <ProductGrid products={products.slice(0, 4)} />
      </div>
    </section>
  );
}

export function Recommendations({ productId }: { productId: string }) {
  return (
    <Suspense fallback={null}>
      <RecommendationList productId={productId} />
    </Suspense>
  );
}
