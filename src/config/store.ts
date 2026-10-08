type StoreConfig = {
  name: string;
  tagline: string;
  locale: string;
  language: string;
  shippingDays: { min: number; max: number } | null;
  freeShippingThresholds: Partial<Record<string, string>>;
  returnDays: number | null;
  warrantyMonths: number | null;
  newsletterBenefit: string | null;
  shippingAndReturns: string | null;
};

export const store: StoreConfig = {
  name: "Lirio",
  tagline: "Tecnología seleccionada con buen gusto.",
  locale: "es-419",
  language: "ES",
  // TODO: plazo de entrega en días hábiles.
  shippingDays: null,
  // TODO: monto mínimo para envío gratis por moneda, con el formato { EUR: "50.00" }.
  freeShippingThresholds: {},
  // TODO: días para devoluciones.
  returnDays: null,
  // TODO: meses de garantía.
  warrantyMonths: null,
  // TODO: beneficio por suscribirse al newsletter.
  newsletterBenefit: null,
  // TODO: texto de envíos y devoluciones para la ficha de producto.
  shippingAndReturns: null,
};
