import { CartProvider } from "@/components/cart/cart-context";
import { CheckoutHeader } from "@/components/layout/checkout-header";
import { SkipLink } from "@/components/layout/skip-link";
import { getCurrentCart } from "@/lib/cart";

export default function CheckoutLayout({ children }: LayoutProps<"/">) {
  return (
    <CartProvider cartPromise={getCurrentCart()}>
      <SkipLink />
      <CheckoutHeader />
      <main id="contenido" className="flex-1">
        {children}
      </main>
    </CartProvider>
  );
}
