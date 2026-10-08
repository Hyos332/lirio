import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";

import { createCart, getCart, type Cart } from "@/lib/commerce";
import { getCountry } from "@/lib/country";

import { DAY, setPersistentCookie } from "./cookies";

const CART_COOKIE = "cartId";

export const getCurrentCart = cache(async () => {
  const cartId = (await cookies()).get(CART_COOKIE)?.value;
  return cartId ? getCart(cartId) : null;
});

export async function saveCart(cart: Cart) {
  await setPersistentCookie(CART_COOKIE, cart.id, 30 * DAY);
}

export async function getOrCreateCart() {
  const cart = await getCurrentCart();
  if (cart) return cart;
  const country = await getCountry();
  return createCart(country.isoCode);
}
