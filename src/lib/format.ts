import { store } from "@/config/store";
import type { Money } from "@/lib/commerce/types";

const formatters = new Map<string, Intl.NumberFormat>();

function getFormatter(currencyCode: string) {
  let formatter = formatters.get(currencyCode);
  if (!formatter) {
    formatter = new Intl.NumberFormat(store.locale, {
      style: "currency",
      currency: currencyCode,
    });
    formatters.set(currencyCode, formatter);
  }
  return formatter;
}

export function formatMoney(money: Money) {
  return getFormatter(money.currencyCode).format(Number(money.amount));
}

export function pluralize(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}
