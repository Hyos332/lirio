import type { CommerceProvider } from "../provider";
import type { Cart } from "../types";
import {
  addLines,
  buildCart,
  decodeCart,
  emptyCart,
  removeLines,
  updateLines,
  type CartState,
} from "./cart";
import {
  belongsTo,
  listProducts,
  recommend,
  searchCatalog,
  toCollection,
  toProduct,
  toSummary,
} from "./catalog";
import { currencyFor, data, findCollection, findProduct } from "./data";

function mutateCart(
  cartId: string,
  change: (state: CartState) => CartState,
): Cart {
  const state = decodeCart(cartId);
  if (!state) throw new Error("El carrito no existe o expiró.");
  return buildCart(change(state));
}

export const mockProvider: CommerceProvider = {
  async getCountries() {
    return data.countries;
  },

  async getMenu(handle) {
    return (data.menus[handle] ?? []).map((item) => ({ ...item, items: [] }));
  },

  async getCollections() {
    return data.collections.map(toCollection);
  },

  async getCollection(handle) {
    const collection = findCollection(handle);
    return collection ? toCollection(collection) : null;
  },

  async getCollectionProducts({ handle, ...params }) {
    const collection = findCollection(handle);
    const products = collection
      ? data.products.filter((product) => belongsTo(product, collection))
      : [];
    return listProducts(products, params);
  },

  async searchProducts({ query, ...params }) {
    return listProducts(searchCatalog(query), params);
  },

  async getProduct({ handle, country }) {
    const product = findProduct(handle);
    return product ? toProduct(product, currencyFor(country)) : null;
  },

  async getProductRecommendations({ productId, country }) {
    const product = findProduct(productId);
    if (!product) return [];
    return recommend(product).map((candidate) =>
      toSummary(candidate, currencyFor(country)),
    );
  },

  async getPage(handle) {
    const page = data.pages.find((entry) => entry.handle === handle);
    if (!page) return null;
    return {
      id: page.handle,
      handle: page.handle,
      title: page.title,
      body: "<p>Contenido pendiente. Edita esta página en Shopify.</p>",
      seo: { title: page.title, description: "" },
    };
  },

  async createCart(country) {
    return buildCart(emptyCart(country));
  },

  async getCart(cartId) {
    const state = decodeCart(cartId);
    return state ? buildCart(state) : null;
  },

  async addToCart(cartId, lines) {
    return mutateCart(cartId, (state) => addLines(state, lines));
  },

  async updateCart(cartId, lines) {
    return mutateCart(cartId, (state) => updateLines(state, lines));
  },

  async removeFromCart(cartId, lineIds) {
    return mutateCart(cartId, (state) => removeLines(state, lineIds));
  },

  async applyDiscount(cartId, codes) {
    return mutateCart(cartId, (state) => ({ ...state, codes }));
  },

  async updateCartCountry(cartId, country) {
    return mutateCart(cartId, (state) => ({ ...state, country }));
  },
};
