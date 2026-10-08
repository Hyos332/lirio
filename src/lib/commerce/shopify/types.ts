export type ShopifyMoney = { amount: string; currencyCode: string };

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type ShopifySeo = { title: string | null; description: string | null };

export type ShopifySelectedOption = { name: string; value: string };

export type ShopifyProductCard = {
  id: string;
  handle: string;
  title: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  priceRange: { minVariantPrice: ShopifyMoney };
  compareAtPriceRange: { minVariantPrice: ShopifyMoney };
  subtitle: { value: string } | null;
};

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: ShopifySelectedOption[];
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  image: ShopifyImage | null;
};

export type ShopifyProduct = ShopifyProductCard & {
  vendor: string;
  description: string;
  descriptionHtml: string;
  images: { nodes: ShopifyImage[] };
  options: {
    name: string;
    optionValues: { name: string; swatch: { color: string | null } | null }[];
  }[];
  variants: { nodes: ShopifyVariant[] };
  specifications: { type: string; value: string } | null;
  collections: { nodes: { handle: string; title: string }[] };
  seo: ShopifySeo;
};

export type ShopifyCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  seo: ShopifySeo;
};

export type ShopifyFilter = {
  id: string;
  label: string;
  type: "LIST" | "PRICE_RANGE" | "BOOLEAN";
  values: {
    id: string;
    label: string;
    count: number;
    input: string;
    swatch: { color: string | null } | null;
  }[];
};

export type ShopifyPageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

export type ShopifyProductConnection = {
  filters: ShopifyFilter[];
  pageInfo: ShopifyPageInfo;
  nodes: ShopifyProductCard[];
};

export type ShopifySearchConnection = {
  totalCount: number;
  productFilters: ShopifyFilter[];
  pageInfo: ShopifyPageInfo;
  nodes: (ShopifyProductCard | Record<string, never>)[];
};

export type ShopifyMenuItem = {
  title: string;
  url: string | null;
  items?: ShopifyMenuItem[];
};

export type ShopifyPage = {
  id: string;
  handle: string;
  title: string;
  body: string;
  seo: ShopifySeo;
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  cost: { totalAmount: ShopifyMoney };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: ShopifySelectedOption[];
    image: ShopifyImage | null;
    product: {
      handle: string;
      title: string;
      featuredImage: ShopifyImage | null;
    };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: ShopifyMoney; totalAmount: ShopifyMoney };
  discountCodes: { code: string; applicable: boolean }[];
  discountAllocations: { discountedAmount: ShopifyMoney }[];
  lines: { nodes: ShopifyCartLine[] };
};

export type ShopifyCountry = {
  isoCode: string;
  name: string;
  currency: { isoCode: string };
};

export type ShopifyPaymentSettings = {
  acceptedCardBrands: string[];
  supportedDigitalWallets: string[];
};

export type ShopifyUserError = { field: string[] | null; message: string };
