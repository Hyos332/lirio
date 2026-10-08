import type { Money } from "@/lib/commerce/types";

const DEFAULT_LOCALE = "es";

const formatters = new Map<string, Intl.NumberFormat>();

function getFormatter(locale: string, currencyCode: string) {
  const key = `${locale}:${currencyCode}`;
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    });
    formatters.set(key, formatter);
  }
  return formatter;
}

/** Formatea un importe con la moneda que trae el propio dato. */
export function formatMoney(money: Money, locale = DEFAULT_LOCALE) {
  return getFormatter(locale, money.currencyCode).format(Number(money.amount));
}
