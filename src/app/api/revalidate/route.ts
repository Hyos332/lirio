import { revalidateTag } from "next/cache";

import { env } from "@/env";
import { cacheTags } from "@/lib/commerce/cache-tags";
import { isValidWebhook } from "@/lib/commerce/shopify/webhook";

const tagsByTopic: Record<string, string[]> = {
  "products/create": [cacheTags.products],
  "products/update": [cacheTags.products],
  "products/delete": [cacheTags.products],
  "collections/create": [cacheTags.collections],
  "collections/update": [cacheTags.collections],
  "collections/delete": [cacheTags.collections],
};

export async function POST(request: Request) {
  const secret = env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json({ error: "Webhook no configurado." }, { status: 503 });
  }

  const body = await request.text();
  if (
    !isValidWebhook(body, request.headers.get("x-shopify-hmac-sha256"), secret)
  ) {
    return Response.json({ error: "Firma no válida." }, { status: 401 });
  }

  const tags = tagsByTopic[request.headers.get("x-shopify-topic") ?? ""] ?? [];
  for (const tag of tags) revalidateTag(tag, "max");

  return Response.json({ revalidated: tags });
}
