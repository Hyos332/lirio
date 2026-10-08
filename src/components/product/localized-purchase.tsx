import type { ReactNode } from "react";

import { getProduct } from "@/lib/commerce";
import { getCountry } from "@/lib/country";

import { ProductForm } from "./product-form";

type LocalizedPurchaseProps = { handle: string; children: ReactNode };

export async function LocalizedPurchase({
  handle,
  children,
}: LocalizedPurchaseProps) {
  const country = await getCountry();
  const product = await getProduct({ handle, country: country.isoCode });
  if (!product) return null;
  return <ProductForm product={product}>{children}</ProductForm>;
}
