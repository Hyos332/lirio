import { store } from "@/config/store";

const { shippingDays, returnDays, warrantyMonths } = store;

export const policies = {
  shippingDays: shippingDays
    ? `${shippingDays.min}–${shippingDays.max} días`
    : null,
  returnDays: returnDays ? `${returnDays} días` : null,
  warrantyMonths: warrantyMonths ? `${warrantyMonths} meses` : null,
};
