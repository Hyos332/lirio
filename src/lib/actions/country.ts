"use server";

import { getCurrentCart, saveCart } from "@/lib/cart";
import { getCountries, updateCartCountry } from "@/lib/commerce";
import { DAY, setPersistentCookie } from "@/lib/cookies";
import { COUNTRY_COOKIE } from "@/lib/country";

export async function changeCountry(formData: FormData) {
  const code = formData.get("country");
  const countries = await getCountries();
  if (
    typeof code !== "string" ||
    !countries.some((country) => country.isoCode === code)
  ) {
    return;
  }

  await setPersistentCookie(COUNTRY_COOKIE, code, 365 * DAY);

  const cart = await getCurrentCart();
  if (cart) await saveCart(await updateCartCountry(cart.id, code));
}
