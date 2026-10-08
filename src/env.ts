import "server-only";

import { z } from "zod";

const schema = z.object({
  COMMERCE_PROVIDER: z.enum(["mock"]).default("mock"),
  SHOPIFY_COUNTRY: z
    .string()
    .regex(
      /^[A-Z]{2}$/,
      "Debe ser un código ISO de país en mayúsculas, por ejemplo ES",
    )
    .default("ES"),
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(
    `Variables de entorno inválidas:\n${z.prettifyError(parsed.error)}`,
  );
}

export const env = parsed.data;
