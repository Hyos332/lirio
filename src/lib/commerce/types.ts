export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Seo = {
  title: string;
  description: string;
};

export type Country = {
  isoCode: string;
  name: string;
  currencyCode: string;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductOptionValue = {
  name: string;
  swatch: string | null;
};

export type ProductOption = {
  name: string;
  values: ProductOptionValue[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: Money;
  compareAtPrice: Money | null;
  image: Image | null;
};

export type ProductSummary = {
  id: string;
  handle: string;
  title: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: Image | null;
  price: Money;
  compareAtPrice: Money | null;
};

export type Specification = {
  label: string;
  value: string;
};

export type Reference = {
  handle: string;
  title: string;
};

export type Product = ProductSummary & {
  vendor: string;
  description: string;
  descriptionHtml: string;
  images: Image[];
  options: ProductOption[];
  variants: ProductVariant[];
  specifications: Specification[];
  collection: Reference | null;
  seo: Seo;
};

export type Collection = Reference & {
  id: string;
  description: string;
  image: Image | null;
  seo: Seo;
};

export type ProductSort =
  "relevance" | "best-selling" | "price-asc" | "price-desc" | "newest";

export type ProductFilter =
  | { available: boolean }
  | { price: { min?: number; max?: number } }
  | { productType: string }
  | { tag: string }
  | { variantOption: SelectedOption };

export type FilterValue = {
  id: string;
  label: string;
  count: number;
  input: ProductFilter;
  swatch: string | null;
};

export type Filter = {
  id: string;
  label: string;
  type: "list" | "price-range" | "boolean";
  values: FilterValue[];
};

export type PageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

export type ProductConnection = {
  products: ProductSummary[];
  filters: Filter[];
  pageInfo: PageInfo;
  totalCount: number | null;
};

export type MenuItem = {
  title: string;
  path: string;
  items: MenuItem[];
};

export type Page = {
  id: string;
  handle: string;
  title: string;
  body: string;
  seo: Seo;
};

export type CartMerchandise = {
  id: string;
  title: string;
  selectedOptions: SelectedOption[];
  image: Image | null;
  product: Reference;
};

export type CartLine = {
  id: string;
  quantity: number;
  cost: Money;
  merchandise: CartMerchandise;
};

export type DiscountCode = {
  code: string;
  applicable: boolean;
};

export type Cart = {
  id: string;
  checkoutUrl: string | null;
  totalQuantity: number;
  lines: CartLine[];
  subtotal: Money;
  total: Money;
  discountCodes: DiscountCode[];
};

export type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};

export type CartLineUpdate = {
  id: string;
  quantity: number;
};
