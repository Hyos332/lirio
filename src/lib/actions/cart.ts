"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { getOrCreateCart, saveCart } from "@/lib/cart";
import { addToCart } from "@/lib/commerce";
import { MAX_QUANTITY } from "@/lib/product";

export type CartActionState = {
  status: "idle" | "added" | "error";
  message: string;
};

const lineSchema = z.object({
  merchandiseId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(MAX_QUANTITY),
});

const failed: CartActionState = {
  status: "error",
  message: "No pudimos agregar el producto. Inténtalo de nuevo.",
};

async function addLine(formData: FormData) {
  const line = lineSchema.safeParse({
    merchandiseId: formData.get("merchandiseId"),
    quantity: formData.get("quantity"),
  });
  if (!line.success) return null;

  try {
    const cart = await addToCart((await getOrCreateCart()).id, [line.data]);
    await saveCart(cart);
    return cart;
  } catch (error) {
    console.error("Error al agregar al carrito", error);
    return null;
  }
}

export async function purchase(
  _previous: CartActionState,
  formData: FormData,
): Promise<CartActionState> {
  const cart = await addLine(formData);
  if (!cart) return failed;
  if (formData.get("intent") !== "buy") {
    return { status: "added", message: "Agregado al carrito." };
  }
  if (!cart.checkoutUrl) {
    return {
      status: "error",
      message: "Conecta Shopify para habilitar el pago.",
    };
  }
  redirect(cart.checkoutUrl);
}
