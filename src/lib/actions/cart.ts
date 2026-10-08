"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { getCurrentCart, getOrCreateCart, saveCart } from "@/lib/cart";
import {
  addToCart,
  applyDiscount,
  removeFromCart,
  updateCart,
} from "@/lib/commerce";
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

const quantitySchema = z.number().int().min(0).max(MAX_QUANTITY);

export async function setLineQuantity(lineId: string, quantity: number) {
  const cart = await getCurrentCart();
  if (!cart || !quantitySchema.safeParse(quantity).success) return;

  try {
    await saveCart(
      quantity === 0
        ? await removeFromCart(cart.id, [lineId])
        : await updateCart(cart.id, [{ id: lineId, quantity }]),
    );
  } catch (error) {
    console.error("Error al actualizar el carrito", error);
  }
}

export type DiscountState = {
  status: "idle" | "applied" | "error";
  message: string;
  code: string;
};

const sameCode = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

export async function applyDiscountCode(
  _previous: DiscountState,
  formData: FormData,
): Promise<DiscountState> {
  const code = String(formData.get("code") ?? "").trim();
  if (!code) return { status: "error", message: "Ingresa un código.", code };

  const cart = await getCurrentCart();
  if (!cart)
    return { status: "error", message: "Tu carrito está vacío.", code };

  const active = cart.discountCodes
    .filter((entry) => entry.applicable)
    .map((entry) => entry.code);
  if (active.some((entry) => sameCode(entry, code))) {
    return {
      status: "applied",
      message: "Ese código ya está aplicado.",
      code: "",
    };
  }

  try {
    const updated = await applyDiscount(cart.id, [...active, code]);
    const applied = updated.discountCodes.some(
      (entry) => entry.applicable && sameCode(entry.code, code),
    );
    await saveCart(applied ? updated : await applyDiscount(updated.id, active));
    return applied
      ? { status: "applied", message: `Código ${code} aplicado.`, code: "" }
      : { status: "error", message: `El código ${code} no es válido.`, code };
  } catch (error) {
    console.error("Error al aplicar el descuento", error);
    return {
      status: "error",
      message: "No pudimos aplicar el código. Inténtalo de nuevo.",
      code,
    };
  }
}

export async function removeDiscountCode(code: string) {
  const cart = await getCurrentCart();
  if (!cart) return;
  const remaining = cart.discountCodes
    .filter((entry) => entry.applicable && !sameCode(entry.code, code))
    .map((entry) => entry.code);
  await saveCart(await applyDiscount(cart.id, remaining));
}
