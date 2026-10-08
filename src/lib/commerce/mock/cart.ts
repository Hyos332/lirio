import { z } from "zod";

import type {
  Cart,
  CartLine,
  CartLineInput,
  CartLineUpdate,
  Money,
} from "../types";
import { currencyFor, data, type MockProduct, type MockVariant } from "./data";
import { toVariant } from "./catalog";

const stateSchema = z.object({
  country: z.string(),
  lines: z.array(
    z.object({
      merchandiseId: z.string(),
      quantity: z.number().int().positive(),
    }),
  ),
  codes: z.array(z.string()),
});

export type CartState = z.infer<typeof stateSchema>;

const variants = new Map<
  string,
  { product: MockProduct; variant: MockVariant }
>(
  data.products.flatMap((product) =>
    product.variants.map(
      (variant) => [variant.id, { product, variant }] as const,
    ),
  ),
);

const toCents = (money: Money) => Math.round(Number(money.amount) * 100);

const fromCents = (cents: number, currencyCode: string): Money => ({
  amount: (cents / 100).toFixed(2),
  currencyCode,
});

export function emptyCart(country: string): CartState {
  return { country, lines: [], codes: [] };
}

export function decodeCart(cartId: string): CartState | null {
  try {
    return stateSchema.parse(
      JSON.parse(Buffer.from(cartId, "base64url").toString("utf8")),
    );
  } catch {
    return null;
  }
}

function encodeCart(state: CartState) {
  return Buffer.from(JSON.stringify(state)).toString("base64url");
}

function findDiscount(code: string) {
  return data.discountCodes.find(
    (discount) => discount.code.toLowerCase() === code.toLowerCase(),
  );
}

export function addLines(state: CartState, inputs: CartLineInput[]): CartState {
  const lines = [...state.lines];
  for (const input of inputs) {
    const existing = lines.findIndex(
      (line) => line.merchandiseId === input.merchandiseId,
    );
    if (existing === -1) {
      lines.push(input);
    } else {
      lines[existing] = {
        ...lines[existing],
        quantity: lines[existing].quantity + input.quantity,
      };
    }
  }
  return { ...state, lines };
}

export function updateLines(
  state: CartState,
  updates: CartLineUpdate[],
): CartState {
  const quantities = new Map(
    updates.map((update) => [update.id, update.quantity]),
  );
  return {
    ...state,
    lines: state.lines
      .map((line) => ({
        ...line,
        quantity: quantities.get(line.merchandiseId) ?? line.quantity,
      }))
      .filter((line) => line.quantity > 0),
  };
}

export function removeLines(state: CartState, lineIds: string[]): CartState {
  return {
    ...state,
    lines: state.lines.filter((line) => !lineIds.includes(line.merchandiseId)),
  };
}

export function buildCart(state: CartState): Cart {
  const currencyCode = currencyFor(state.country);

  const lines = state.lines.flatMap((line): CartLine[] => {
    const entry = variants.get(line.merchandiseId);
    if (!entry) return [];

    const { id, title, selectedOptions, image, price } = toVariant(
      entry.product,
      entry.variant,
      currencyCode,
    );

    return [
      {
        id,
        quantity: line.quantity,
        cost: fromCents(toCents(price) * line.quantity, currencyCode),
        merchandise: {
          id,
          title,
          selectedOptions,
          image,
          product: { handle: entry.product.handle, title: entry.product.title },
        },
      },
    ];
  });

  const subtotal = lines.reduce((sum, line) => sum + toCents(line.cost), 0);
  const percentage = Math.max(
    0,
    ...state.codes.map((code) => findDiscount(code)?.percentage ?? 0),
  );

  return {
    id: encodeCart(state),
    checkoutUrl: null,
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    lines,
    subtotal: fromCents(subtotal, currencyCode),
    total: fromCents(
      Math.round(subtotal * (1 - percentage / 100)),
      currencyCode,
    ),
    discountCodes: state.codes.map((code) => ({
      code,
      applicable: Boolean(findDiscount(code)),
    })),
  };
}
