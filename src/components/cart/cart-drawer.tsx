"use client";

import { Suspense } from "react";

import { Drawer } from "@/components/ui/drawer";

import { useCartDrawer } from "./cart-context";
import { CartDrawerView } from "./cart-view";

export function CartDrawer() {
  const { open, setOpen } = useCartDrawer();
  const close = () => setOpen(false);

  return (
    <Drawer open={open} onClose={close} title="Tu carrito">
      <Suspense fallback={null}>
        <CartDrawerView onNavigate={close} />
      </Suspense>
    </Drawer>
  );
}
