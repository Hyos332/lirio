import "server-only";

import { z } from "zod";

const optional = z.string().optional();

const required = z.string({
  error: "Falta esta variable. Es obligatoria con COMMERCE_PROVIDER=shopify.",
});

const shared = {
  SHOPIFY_COUNTRY: z
    .string()
    .regex(
      /^[A-Z]{2}$/,
      "Debe ser un código ISO de país en mayúsculas, por ejemplo ES",
    )
    .default("ES"),
  SHOPIFY_WEBHOOK_SECRET: optional,
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
};

const schema = z.discriminatedUnion("COMMERCE_PROVIDER", [
  z.object({
    ...shared,
    COMMERCE_PROVIDER: z.literal("mock"),
    SHOPIFY_STORE_DOMAIN: optional,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: optional,
    SHOPIFY_API_VERSION: optional,
  }),
  z.object({
    ...shared,
    COMMERCE_PROVIDER: z.literal("shopify"),
    SHOPIFY_STORE_DOMAIN: required
      .transform((value) =>
        value.replace(/^https?:\/\//, "").replace(/\/+$/, ""),
      )
      .pipe(
        z
          .string()
          .regex(
            /^[a-z0-9.-]+$/i,
            "Usa solo el dominio, por ejemplo tu-tienda.myshopify.com",
          ),
      ),
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: required,
    SHOPIFY_API_VERSION: required.regex(
      /^\d{4}-\d{2}$/,
      "Usa el formato AAAA-MM, por ejemplo 2026-10",
    ),
  }),
]);

const definedValues = Object.fromEntries(
  Object.entries(process.env).filter(
    ([, value]) => value !== undefined && value.trim() !== "",
  ),
);

const parsed = schema.safeParse({
  COMMERCE_PROVIDER: "mock",
  ...definedValues,
});

if (!parsed.success) {
  throw new Error(
    `Variables de entorno inválidas:\n${z.prettifyError(parsed.error)}`,
  );
}

export const env = parsed.data;
