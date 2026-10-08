import { document } from "../document";
import { cartFragment } from "../fragments/cart";
import { imageFragment } from "../fragments/image";

const cartPayload = `
  cart {
    ...Cart
  }
  userErrors {
    field
    message
  }
`;

const cartMutation = (signature: string, call: string) =>
  document(
    `
  mutation ${signature} @inContext(language: $language) {
    ${call} {
      ${cartPayload}
    }
  }
`,
    cartFragment,
    imageFragment,
  );

export const cartCreateMutation = cartMutation(
  "CartCreate($input: CartInput!, $language: LanguageCode)",
  "cartCreate(input: $input)",
);

export const cartLinesAddMutation = cartMutation(
  "CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!, $language: LanguageCode)",
  "cartLinesAdd(cartId: $cartId, lines: $lines)",
);

export const cartLinesUpdateMutation = cartMutation(
  "CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!, $language: LanguageCode)",
  "cartLinesUpdate(cartId: $cartId, lines: $lines)",
);

export const cartLinesRemoveMutation = cartMutation(
  "CartLinesRemove($cartId: ID!, $lineIds: [ID!]!, $language: LanguageCode)",
  "cartLinesRemove(cartId: $cartId, lineIds: $lineIds)",
);

export const cartDiscountCodesUpdateMutation = cartMutation(
  "CartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!, $language: LanguageCode)",
  "cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes)",
);

export const cartBuyerIdentityUpdateMutation = cartMutation(
  "CartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!, $language: LanguageCode)",
  "cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity)",
);
