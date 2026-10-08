import { store } from "@/config/store";
import type { Money } from "@/lib/commerce/types";

export function getFreeShippingThreshold(currencyCode: string): Money | null {
  const amount = store.freeShippingThresholds[currencyCode];
  return amount ? { amount, currencyCode } : null;
}
