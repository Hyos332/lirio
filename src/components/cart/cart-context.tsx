"use client";

import {
  createContext,
  startTransition,
  use,
  useOptimistic,
  useState,
  type ReactNode,
} from "react";

import { setLineQuantity } from "@/lib/actions/cart";
import type { Cart, CartLine } from "@/lib/commerce/types";
import { fromCents, toCents } from "@/lib/money";

type CartContextValue = {
  cartPromise: Promise<Cart | null>;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  cartPromise: Promise<Cart | null>;
  children: ReactNode;
};

export function CartProvider({ cartPromise, children }: CartProviderProps) {
  const [open, setOpen] = useState(false);
  return (
    <CartContext value={{ cartPromise, open, setOpen }}>{children}</CartContext>
  );
}

function useCartContext() {
  const context = use(CartContext);
  if (!context)
    throw new Error("useCart debe usarse dentro de <CartProvider>.");
  return context;
}

export function useCartDrawer() {
  const { open, setOpen } = useCartContext();
  return { open, setOpen };
}

type QuantityChange = { lineId: string; quantity: number };

function withQuantity(cart: Cart | null, { lineId, quantity }: QuantityChange) {
  if (!cart) return cart;
  const { currencyCode } = cart.subtotal;

  const lines = cart.lines.flatMap((line): CartLine[] => {
    if (line.id !== lineId) return [line];
    if (quantity === 0) return [];
    const unit = toCents(line.cost) / line.quantity;
    return [
      {
        ...line,
        quantity,
        cost: fromCents(Math.round(unit * quantity), currencyCode),
      },
    ];
  });

  const subtotal = lines.reduce((sum, line) => sum + toCents(line.cost), 0);
  const delta = subtotal - toCents(cart.subtotal);

  return {
    ...cart,
    lines,
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: fromCents(subtotal, currencyCode),
    total: fromCents(toCents(cart.total) + delta, currencyCode),
  };
}

export function useCart() {
  const { cartPromise } = useCartContext();
  const [cart, applyChange] = useOptimistic(use(cartPromise), withQuantity);

  function setQuantity(lineId: string, quantity: number) {
    startTransition(async () => {
      applyChange({ lineId, quantity });
      await setLineQuantity(lineId, quantity);
    });
  }

  return { cart, setQuantity };
}
