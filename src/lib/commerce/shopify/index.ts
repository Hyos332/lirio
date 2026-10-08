import type { CommerceProvider } from "../provider";
import type { Cart, ProductSort } from "../types";
import {
  assertNoUserErrors,
  createShopifyClient,
  type ShopifyConfig,
} from "./client";
import {
  cartBuyerIdentityUpdateMutation,
  cartCreateMutation,
  cartDiscountCodesUpdateMutation,
  cartLinesAddMutation,
  cartLinesRemoveMutation,
  cartLinesUpdateMutation,
} from "./mutations/cart";
import {
  emptyConnection,
  normalizeCart,
  normalizeCollection,
  normalizeCountries,
  normalizeMenu,
  normalizePage,
  normalizePaymentMethods,
  normalizeProduct,
  normalizeProductConnection,
  normalizeProductSummary,
} from "./normalize";
import { cartQuery } from "./queries/cart";
import {
  collectionProductsQuery,
  collectionQuery,
  collectionsQuery,
} from "./queries/collection";
import { menuQuery, pageQuery } from "./queries/content";
import { productQuery, productRecommendationsQuery } from "./queries/product";
import { searchProductsQuery } from "./queries/search";
import { countriesQuery, paymentSettingsQuery } from "./queries/shop";
import type {
  ShopifyCart,
  ShopifyCollection,
  ShopifyCountry,
  ShopifyMenuItem,
  ShopifyPage,
  ShopifyPaymentSettings,
  ShopifyProduct,
  ShopifyProductCard,
  ShopifyProductConnection,
  ShopifySearchConnection,
  ShopifyUserError,
} from "./types";

type SortInput = { sortKey: string; reverse: boolean };

const collectionSorts: Record<ProductSort, SortInput> = {
  relevance: { sortKey: "COLLECTION_DEFAULT", reverse: false },
  "best-selling": { sortKey: "BEST_SELLING", reverse: false },
  "price-asc": { sortKey: "PRICE", reverse: false },
  "price-desc": { sortKey: "PRICE", reverse: true },
  newest: { sortKey: "CREATED", reverse: true },
};

const searchSorts: Record<ProductSort, SortInput> = {
  relevance: { sortKey: "RELEVANCE", reverse: false },
  "best-selling": { sortKey: "RELEVANCE", reverse: false },
  "price-asc": { sortKey: "PRICE", reverse: false },
  "price-desc": { sortKey: "PRICE", reverse: true },
  newest: { sortKey: "RELEVANCE", reverse: false },
};

type CartPayload = { cart: ShopifyCart | null; userErrors: ShopifyUserError[] };

export type ShopifyProviderConfig = ShopifyConfig & {
  language: string;
  categoryHandles: string[];
};

export function createShopifyProvider(
  config: ShopifyProviderConfig,
): CommerceProvider {
  const shopifyFetch = createShopifyClient(config);
  const { language } = config;

  async function mutateCart<K extends string>(
    mutation: string,
    field: K,
    variables: Record<string, unknown>,
  ): Promise<Cart> {
    const data = await shopifyFetch<Record<K, CartPayload>>(mutation, {
      ...variables,
      language,
    });
    const { cart, userErrors } = data[field];
    assertNoUserErrors(userErrors);
    if (!cart) throw new Error("Shopify no devolvió el carrito.");
    return normalizeCart(cart);
  }

  return {
    accountUrl: `https://${config.domain}/account`,

    async getCountries() {
      const data = await shopifyFetch<{
        localization: { availableCountries: ShopifyCountry[] };
      }>(countriesQuery, { language });
      return normalizeCountries(data.localization.availableCountries);
    },

    async getPaymentMethods() {
      const data = await shopifyFetch<{
        shop: { paymentSettings: ShopifyPaymentSettings };
      }>(paymentSettingsQuery);
      return normalizePaymentMethods(data.shop.paymentSettings);
    },

    async getMenu(handle) {
      const data = await shopifyFetch<{
        menu: { items: ShopifyMenuItem[] } | null;
      }>(menuQuery, {
        handle,
        language,
      });
      return data.menu ? normalizeMenu(data.menu.items) : [];
    },

    async getCollections() {
      const data = await shopifyFetch<{
        collections: { nodes: ShopifyCollection[] };
      }>(collectionsQuery, { language });
      return data.collections.nodes.map(normalizeCollection);
    },

    async getCollection(handle) {
      const data = await shopifyFetch<{ collection: ShopifyCollection | null }>(
        collectionQuery,
        {
          handle,
          language,
        },
      );
      return data.collection ? normalizeCollection(data.collection) : null;
    },

    async getCollectionProducts({
      handle,
      country,
      sort = "relevance",
      filters,
      first,
      after,
    }) {
      const data = await shopifyFetch<{
        collection: { products: ShopifyProductConnection } | null;
      }>(collectionProductsQuery, {
        handle,
        first,
        after,
        filters,
        country,
        language,
        ...collectionSorts[sort],
      });
      return data.collection
        ? normalizeProductConnection(data.collection.products)
        : emptyConnection;
    },

    async searchProducts({
      query,
      country,
      sort = "relevance",
      filters,
      first,
      after,
    }) {
      const data = await shopifyFetch<{ search: ShopifySearchConnection }>(
        searchProductsQuery,
        {
          query,
          first,
          after,
          filters,
          country,
          language,
          ...searchSorts[sort],
        },
      );
      const { productFilters, ...connection } = data.search;
      return normalizeProductConnection({
        ...connection,
        filters: productFilters,
      });
    },

    async getProduct({ handle, country }) {
      const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
        productQuery,
        {
          handle,
          country,
          language,
        },
      );
      return data.product
        ? normalizeProduct(data.product, config.categoryHandles)
        : null;
    },

    async getProductRecommendations({ productId, country }) {
      const data = await shopifyFetch<{
        productRecommendations: ShopifyProductCard[] | null;
      }>(productRecommendationsQuery, { productId, country, language });
      return (data.productRecommendations ?? []).map(normalizeProductSummary);
    },

    async getPage(handle) {
      const data = await shopifyFetch<{ page: ShopifyPage | null }>(pageQuery, {
        handle,
        language,
      });
      return data.page ? normalizePage(data.page) : null;
    },

    async createCart(country) {
      return mutateCart(cartCreateMutation, "cartCreate", {
        input: { buyerIdentity: { countryCode: country } },
      });
    },

    async getCart(cartId) {
      const data = await shopifyFetch<{ cart: ShopifyCart | null }>(cartQuery, {
        cartId,
        language,
      });
      return data.cart ? normalizeCart(data.cart) : null;
    },

    async addToCart(cartId, lines) {
      return mutateCart(cartLinesAddMutation, "cartLinesAdd", {
        cartId,
        lines,
      });
    },

    async updateCart(cartId, lines) {
      return mutateCart(cartLinesUpdateMutation, "cartLinesUpdate", {
        cartId,
        lines,
      });
    },

    async removeFromCart(cartId, lineIds) {
      return mutateCart(cartLinesRemoveMutation, "cartLinesRemove", {
        cartId,
        lineIds,
      });
    },

    async applyDiscount(cartId, discountCodes) {
      return mutateCart(
        cartDiscountCodesUpdateMutation,
        "cartDiscountCodesUpdate",
        {
          cartId,
          discountCodes,
        },
      );
    },

    async updateCartCountry(cartId, country) {
      return mutateCart(
        cartBuyerIdentityUpdateMutation,
        "cartBuyerIdentityUpdate",
        {
          cartId,
          buyerIdentity: { countryCode: country },
        },
      );
    },
  };
}
