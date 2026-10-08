import type { ShopifyUserError } from "./types";

export type ShopifyConfig = {
  domain: string;
  token: string;
  apiVersion: string;
};

export class ShopifyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShopifyError";
  }
}

type GraphQLResponse<T> = { data?: T; errors?: { message: string }[] };

export function createShopifyClient({
  domain,
  token,
  apiVersion,
}: ShopifyConfig) {
  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  return async function shopifyFetch<T>(
    query: string,
    variables: Record<string, unknown> = {},
  ): Promise<T> {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      console.error(
        `Shopify respondió ${response.status} ${response.statusText}`,
      );
      throw new ShopifyError(
        `Shopify respondió con el estado ${response.status}.`,
      );
    }

    const body = (await response.json()) as GraphQLResponse<T>;
    if (body.errors?.length || !body.data) {
      console.error(
        "Errores de Shopify:",
        body.errors?.map((error) => error.message),
      );
      throw new ShopifyError("Shopify devolvió un error en la consulta.");
    }

    return body.data;
  };
}

export function assertNoUserErrors(errors: ShopifyUserError[]) {
  if (errors.length === 0) return;
  console.error("Errores de Shopify en la mutación:", errors);
  throw new ShopifyError(errors.map((error) => error.message).join(" "));
}
