import type { Metadata } from "next";
import { Suspense } from "react";

import { CartPageView } from "@/components/cart/cart-view";
import { Container } from "@/components/ui/container";
import { getPaymentMethods } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "Carrito",
  robots: { index: false, follow: false },
};

function CartSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="h-12 w-64 rounded-pill bg-surface-2" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_405px]">
        <div className="flex flex-col gap-6">
          {[0, 1].map((index) => (
            <div key={index} className="flex gap-6">
              <div className="size-24 rounded-card-sm bg-surface-2 sm:size-35" />
              <div className="mt-4 h-5 flex-1 rounded-pill bg-surface-2" />
            </div>
          ))}
        </div>
        <div className="h-96 rounded-panel bg-surface-2" />
      </div>
    </div>
  );
}

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
