import type {
  Cart,
  CartLineInput,
  CartLineUpdate,
  Collection,
  Country,
  MenuItem,
  Page,
  Product,
  ProductConnection,
  ProductFilter,
  ProductSort,
  ProductSummary,
} from "./types";

export type ProductListParams = {
  country: string;
  sort?: ProductSort;
  filters?: ProductFilter[];
  first?: number;
  after?: string | null;
};

export type CollectionProductsParams = ProductListParams & { handle: string };

export type SearchParams = ProductListParams & { query: string };

export type ProductParams = { handle: string; country: string };

export type RecommendationsParams = { productId: string; country: string };

export type CommerceProvider = {
  accountUrl: string | null;

  getCountries(): Promise<Country[]>;
  getPaymentMethods(): Promise<string[]>;
  getMenu(handle: string): Promise<MenuItem[]>;
  getCollections(): Promise<Collection[]>;
  getCollection(handle: string): Promise<Collection | null>;
  getCollectionProducts(
    params: CollectionProductsParams,
  ): Promise<ProductConnection>;
  searchProducts(params: SearchParams): Promise<ProductConnection>;
  getProduct(params: ProductParams): Promise<Product | null>;
  getProductRecommendations(
    params: RecommendationsParams,
  ): Promise<ProductSummary[]>;
  getPage(handle: string): Promise<Page | null>;

  createCart(country: string): Promise<Cart>;
  getCart(cartId: string): Promise<Cart | null>;
  addToCart(cartId: string, lines: CartLineInput[]): Promise<Cart>;
  updateCart(cartId: string, lines: CartLineUpdate[]): Promise<Cart>;
  removeFromCart(cartId: string, lineIds: string[]): Promise<Cart>;
  applyDiscount(cartId: string, codes: string[]): Promise<Cart>;
  updateCartCountry(cartId: string, country: string): Promise<Cart>;
};
