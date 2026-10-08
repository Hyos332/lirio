import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { categoryHandles } from "@/config/collections";
import { store } from "@/config/store";
import { env } from "@/env";

import { cacheTags } from "./cache-tags";
import { mockProvider } from "./mock";
import type {
  CollectionProductsParams,
  CommerceProvider,
  ProductParams,
  RecommendationsParams,
  SearchParams,
} from "./provider";
import { createShopifyProvider } from "./shopify";

export type * from "./types";
export type * from "./provider";

const provider: CommerceProvider =
  env.COMMERCE_PROVIDER === "shopify"
    ? createShopifyProvider({
        domain: env.SHOPIFY_STORE_DOMAIN,
        token: env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        apiVersion: env.SHOPIFY_API_VERSION,
        language: store.language,
        categoryHandles,
      })
    : mockProvider;

export const accountUrl = provider.accountUrl;

export { cacheTags };

export async function getCountries() {
  "use cache";
  cacheTag(cacheTags.content);
  cacheLife("days");
  return provider.getCountries();
}

export async function getPaymentMethods() {
  "use cache";
  cacheTag(cacheTags.content);
  cacheLife("days");
  return provider.getPaymentMethods();
}

export async function getMenu(handle: string) {
  "use cache";
  cacheTag(cacheTags.content);
  cacheLife("hours");
  return provider.getMenu(handle);
}

export async function getPage(handle: string) {
  "use cache";
  cacheTag(cacheTags.content);
  cacheLife("hours");
  return provider.getPage(handle);
}

export async function getCollections() {
  "use cache";
  cacheTag(cacheTags.collections);
  cacheLife("hours");
  return provider.getCollections();
}

export async function getCollection(handle: string) {
  "use cache";
  cacheTag(cacheTags.collections);
  cacheLife("hours");
  return provider.getCollection(handle);
}

export async function getCollectionProducts(params: CollectionProductsParams) {
  "use cache";
  cacheTag(cacheTags.collections, cacheTags.products);
  cacheLife("hours");
  return provider.getCollectionProducts(params);
}

export async function searchProducts(params: SearchParams) {
  "use cache";
  cacheTag(cacheTags.products);
  cacheLife("hours");
  return provider.searchProducts(params);
}

export async function getProduct(params: ProductParams) {
  "use cache";
  cacheTag(cacheTags.products);
  cacheLife("hours");
  return provider.getProduct(params);
}

export async function getProductRecommendations(params: RecommendationsParams) {
  "use cache";
  cacheTag(cacheTags.products);
  cacheLife("hours");
  return provider.getProductRecommendations(params);
}

export const {
  createCart,
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  applyDiscount,
  updateCartCountry,
} = provider;
