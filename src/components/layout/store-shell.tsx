import type { ReactNode } from "react";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/cart/cart-context";
import { getCurrentCart } from "@/lib/cart";

import { AnnouncementBar } from "./announcement-bar";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SkipLink } from "./skip-link";

type StoreShellProps = { children: ReactNode; headerBordered?: boolean };

export function StoreShell({
  children,
  headerBordered = true,
}: StoreShellProps) {
  return (
    <CartProvider cartPromise={getCurrentCart()}>
      <SkipLink />
      <AnnouncementBar />
      <SiteHeader bordered={headerBordered} />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <CartDrawer />
    </CartProvider>
  );
}
