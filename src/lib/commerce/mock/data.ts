import { z } from "zod";

import json from "./data.json";

const text = z.string().min(1);

const schema = z.object({
  _mock: z.literal(true),
  countries: z
    .array(z.object({ isoCode: text, name: text, currencyCode: text }))
    .nonempty(),
  discountCodes: z.array(
    z.object({ code: text, percentage: z.number().positive().max(100) }),
  ),
  swatches: z.record(text, text),
  tagFilter: z.object({
    label: text,
    tags: z.array(z.object({ tag: text, label: text })),
  }),
  menus: z.record(text, z.array(z.object({ title: text, path: text }))),
  collections: z.array(
    z.object({
      handle: text,
      title: text,
      description: text,
      rule: z.object({ category: text.optional(), tag: text.optional() }),
    }),
  ),
  pages: z.array(z.object({ handle: text, title: text })),
  products: z.array(
    z.object({
      handle: text,
      title: text,
      subtitle: text.optional(),
      category: text,
      productType: text,
      tags: z.array(text),
      createdAt: z.iso.date(),
      bestSellingRank: z.number().int().positive(),
      price: text,
      compareAtPrice: text.optional(),
      description: text,
      features: z.array(text),
      specifications: z.array(z.object({ label: text, value: text })),
      options: z.array(
        z.object({ name: text, values: z.array(text).nonempty() }),
      ),
      variants: z
        .array(
          z.object({
            id: text,
            options: z.record(text, text),
            available: z.boolean(),
          }),
        )
        .nonempty(),
    }),
  ),
});

type MockData = z.infer<typeof schema>;

export type MockProduct = MockData["products"][number];
export type MockVariant = MockProduct["variants"][number];
export type MockCollection = MockData["collections"][number];

export const data = schema.parse(json);

export function findProduct(handle: string) {
  return data.products.find((product) => product.handle === handle);
}

export function findCollection(handle: string) {
  return data.collections.find((collection) => collection.handle === handle);
}

export function currencyFor(country: string) {
  const match = data.countries.find((entry) => entry.isoCode === country);
  return (match ?? data.countries[0]).currencyCode;
}
