/**
 * Tipos de dominio propios de la tienda.
 * Los componentes solo usan estos tipos, nunca los de Shopify.
 */

/** Importe con su moneda, tal como lo devuelve el proveedor (amount es un decimal en texto). */
export type Money = {
  amount: string;
  currencyCode: string;
};
