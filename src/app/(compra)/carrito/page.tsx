import type { Metadata } from "next";
import { Suspense } from "react";

import { CartPageView } from "@/components/cart/cart-view";
import { CartSkeleton } from "@/components/skeletons/page-skeletons";
import { Container } from "@/components/ui/container";
import { getPaymentMethods } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "Carrito",
  robots: { index: false, follow: false },
};

export default async function CartPage() {
  const paymentMethods = await getPaymentMethods();

  return (
    <Container className="pt-8 pb-16 lg:pt-14 lg:pb-24">
      <Suspense fallback={<CartSkeleton />}>
        <CartPageView paymentMethods={paymentMethods} />
      </Suspense>
    </Container>
  );
}
