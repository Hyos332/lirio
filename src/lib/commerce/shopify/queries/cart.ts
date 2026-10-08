import { document } from "../document";
import { cartFragment } from "../fragments/cart";
import { imageFragment } from "../fragments/image";

export const cartQuery = document(
  `
  query Cart($cartId: ID!, $language: LanguageCode) @inContext(language: $language) {
    cart(id: $cartId) {
      ...Cart
    }
  }
`,
  cartFragment,
  imageFragment,
);
