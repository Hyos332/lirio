import type { Money } from "@/lib/commerce/types";

export function toCents(money: Money) {
  return Math.round(Number(money.amount) * 100);
}

export function fromCents(cents: number, currencyCode: string): Money {
  return { amount: (cents / 100).toFixed(2), currencyCode };
}
