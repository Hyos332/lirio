"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useState, type ReactNode } from "react";

import { ClickSpark } from "@/components/motion/click-spark";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { QuantityControl } from "@/components/ui/quantity-control";
import { purchase, type CartActionState } from "@/lib/actions/cart";
import type { Product, ProductVariant } from "@/lib/commerce/types";
import { cn } from "@/lib/cn";
import { resolveVariant, toSelectedOptions, variantParam } from "@/lib/product";

import { useCartDrawer } from "@/components/cart/cart-context";

import { VariantSelector } from "./variant-selector";

const idle: CartActionState = { status: "idle", message: "" };

function selectVariant(variant: ProductVariant) {
  const params = new URLSearchParams(window.location.search);
  params.set("variant", variantParam(variant.id));
  window.history.replaceState(null, "", `?${params}`);
}

type ProductFormProps = { product: Product; children?: ReactNode };

export function ProductForm({ product, children }: ProductFormProps) {
  const variant = resolveVariant(product, useSearchParams().get("variant"));
  const [quantity, setQuantity] = useState(1);
  const { setOpen } = useCartDrawer();
  const [state, action, pending] = useActionState(
    async (previous: CartActionState, formData: FormData) => {
      const result = await purchase(previous, formData);
      if (result.status === "added") setOpen(true);
      return result;
    },
    idle,
  );
  const available = variant.availableForSale;

  return (
    <>
      <Price
        price={variant.price}
        compareAt={variant.compareAtPrice}
        size="lg"
        className="mt-5"
      />
      {children}
      <VariantSelector
        product={product}
        selected={toSelectedOptions(variant)}
        onSelect={selectVariant}
      />
      <form action={action} className="mt-8">
        <input type="hidden" name="merchandiseId" value={variant.id} />
        <input type="hidden" name="quantity" value={quantity} />
        <div className="flex gap-3">
          <QuantityControl
            value={quantity}
            onChange={setQuantity}
            disabled={!available}
          />
          <ClickSpark className="flex-1">
            <Button
              type="submit"
              name="intent"
              value="add"
              variant="accent"
              size="lg"
              fullWidth
              disabled={!available || pending}
            >
              {available ? "Agregar al carrito" : "Agotado"}
            </Button>
          </ClickSpark>
        </div>
        <Button
          type="submit"
          name="intent"
          value="buy"
          variant="secondary"
          size="lg"
          fullWidth
          disabled={!available || pending}
          className="mt-3"
        >
          {available ? "Comprar ahora" : "Agotado"}
        </Button>
        <p
          role="status"
          className={cn(
            "mt-3 flex items-center gap-3 text-sm empty:mt-0",
            state.status === "error" ? "font-medium text-ink" : "text-muted",
          )}
        >
          {state.message}
        </p>
      </form>
    </>
  );
}

export function ProductFormSkeleton() {
  return (
    <div aria-hidden className="mt-5 animate-pulse">
      <div className="h-9 w-40 rounded-pill bg-surface-2" />
      <div className="mt-6 h-5 w-full rounded-pill bg-surface-2" />
      <div className="mt-2 h-5 w-2/3 rounded-pill bg-surface-2" />
      <div className="mt-10 h-14 w-full rounded-pill bg-surface-2" />
      <div className="mt-3 h-14 w-full rounded-pill bg-surface-2" />
    </div>
  );
}
