import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { env } from "@/env";

import { mockProvider } from "./mock";
import type {
  CollectionProductsParams,
  CommerceProvider,
  ProductParams,
  RecommendationsParams,
  SearchParams,
} from "./provider";

export type * from "./types";
export type * from "./provider";

const providers: Record<typeof env.COMMERCE_PROVIDER, CommerceProvider> = {
  mock: mockProvider,
};

const provider = providers[env.COMMERCE_PROVIDER];

export const cacheTags = {
  products: "products",
  collections: "collections",
  content: "content",
} as const;

export async function getCountries() {
  "use cache";
  cacheTag(cacheTags.content);
  cacheLife("days");
  return provider.getCountries();
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
