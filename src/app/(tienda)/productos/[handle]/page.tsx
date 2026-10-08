import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { LocalizedPurchase } from "@/components/product/localized-purchase";
import { ProductDetails } from "@/components/product/product-details";
import { ProductFormSkeleton } from "@/components/product/product-form";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductHighlights } from "@/components/product/product-highlights";
import { Recommendations } from "@/components/product/recommendations";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { collections } from "@/config/collections";
import { getCollectionProducts, getProduct } from "@/lib/commerce";
import { defaultCountry } from "@/lib/country";
import { getProductBadge } from "@/lib/product";
import { routes } from "@/lib/routes";
import { productJsonLd } from "@/lib/seo";
import { handleParams } from "@/lib/static-params";

const loadProduct = (handle: string) =>
  getProduct({ handle, country: defaultCountry });

export async function generateStaticParams() {
  const { products } = await getCollectionProducts({
    handle: collections.all,
    country: defaultCountry,
    sort: "best-selling",
    first: 24,
  });
  return handleParams(products.map((product) => product.handle));
}

export async function generateMetadata({
  params,
}: PageProps<"/productos/[handle]">): Promise<Metadata> {
  const product = await loadProduct((await params).handle);
  if (!product) return {};

  const title = product.seo.title || product.title;
  const description = product.seo.description || product.description;
  const image = product.featuredImage;

  return {
    title,
    description,
    alternates: { canonical: routes.product(product.handle) },
    openGraph: {
      type: "website",
      title,
      description,
      images: image
        ? [
            {
              url: image.url,
              width: image.width,
              height: image.height,
              alt: image.altText,
            },
          ]
        : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/productos/[handle]">) {
  const product = await loadProduct((await params).handle);
  if (!product) notFound();

  const badge = getProductBadge(product.tags);

  return (
    <Container className="pt-6 pb-16 lg:pt-10 lg:pb-24">
      <Breadcrumbs
        items={[
          { title: "Inicio", href: routes.home },
          ...(product.collection
            ? [
                {
                  title: product.collection.title,
                  href: routes.collection(product.collection.handle),
                },
              ]
            : []),
          { title: product.title },
        ]}
      />
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-14">
        <ProductGallery images={product.images} title={product.title} />
        <div>
          {badge && <Badge>{badge}</Badge>}
          <h1 className="mt-3 text-h2-sm md:text-h1-product">
            {product.title}
          </h1>
          {/* TODO: conectar una app de reseñas para mostrar las estrellas y "{N} reseñas". */}
          <Suspense fallback={<ProductFormSkeleton />}>
            <LocalizedPurchase handle={product.handle}>
              <p className="mt-6 text-base text-ink-2">{product.description}</p>
            </LocalizedPurchase>
          </Suspense>
          <ProductHighlights />
          <ProductDetails product={product} />
        </div>
      </div>
      <Recommendations productId={product.id} />
      <JsonLd data={productJsonLd(product)} />
    </Container>
  );
}
