import { fromCents, toCents } from "@/lib/money";
import { routes } from "@/lib/routes";

import type {
  Cart,
  CartLine,
  Collection,
  Country,
  Filter,
  Image,
  MenuItem,
  Money,
  Page,
  PageInfo,
  Product,
  ProductConnection,
  ProductFilter,
  ProductOption,
  ProductSummary,
  ProductVariant,
  SelectedOption,
  Specification,
} from "../types";
import type {
  ShopifyCart,
  ShopifyCartLine,
  ShopifyCollection,
  ShopifyCountry,
  ShopifyFilter,
  ShopifyImage,
  ShopifyMenuItem,
  ShopifyPage,
  ShopifyPageInfo,
  ShopifyPaymentSettings,
  ShopifyProduct,
  ShopifyProductCard,
  ShopifySelectedOption,
  ShopifyVariant,
} from "./types";

const DEFAULT_OPTION = { name: "Title", value: "Default Title" };
const AVAILABILITY_FILTER = "filter.v.availability";

const paymentNames: Record<string, string> = {
  VISA: "Visa",
  MASTERCARD: "Mastercard",
  AMERICAN_EXPRESS: "American Express",
  DISCOVER: "Discover",
  DINERS_CLUB: "Diners Club",
  JCB: "JCB",
  APPLE_PAY: "Apple Pay",
  GOOGLE_PAY: "Google Pay",
  ANDROID_PAY: "Google Pay",
  SHOPIFY_PAY: "Shop Pay",
};

export function normalizeImage(
  image: ShopifyImage | null,
  fallbackAlt = "",
): Image | null {
  if (!image) return null;
  return {
    url: image.url,
    altText: image.altText ?? fallbackAlt,
    width: image.width ?? 0,
    height: image.height ?? 0,
  };
}

function compareAt(price: Money, compare: Money | null): Money | null {
  return compare && toCents(compare) > toCents(price) ? compare : null;
}

function isDefaultOption(option: ShopifySelectedOption) {
  return (
    option.name === DEFAULT_OPTION.name && option.value === DEFAULT_OPTION.value
  );
}

function selectedOptions(options: ShopifySelectedOption[]): SelectedOption[] {
  return options.filter((option) => !isDefaultOption(option));
}

export function normalizeProductSummary(
  product: ShopifyProductCard,
): ProductSummary {
  const price = product.priceRange.minVariantPrice;
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    subtitle: product.subtitle?.value || null,
    productType: product.productType,
    tags: product.tags,
    availableForSale: product.availableForSale,
    featuredImage: normalizeImage(product.featuredImage, product.title),
    price,
    compareAtPrice: compareAt(
      price,
      product.compareAtPriceRange.minVariantPrice,
    ),
  };
}

function normalizeVariant(
  variant: ShopifyVariant,
  productTitle: string,
): ProductVariant {
  const options = selectedOptions(variant.selectedOptions);
  return {
    id: variant.id,
    title: options.length > 0 ? variant.title : productTitle,
    availableForSale: variant.availableForSale,
    selectedOptions: options,
    price: variant.price,
    compareAtPrice: compareAt(variant.price, variant.compareAtPrice),
    image: normalizeImage(variant.image, productTitle),
  };
}

function normalizeOptions(options: ShopifyProduct["options"]): ProductOption[] {
  return options
    .filter(
      (option) =>
        !(
          option.optionValues.length === 1 &&
          option.optionValues[0].name === DEFAULT_OPTION.value
        ),
    )
    .map((option) => ({
      name: option.name,
      values: option.optionValues.map((value) => ({
        name: value.name,
        swatch: value.swatch?.color ?? null,
      })),
    }));
}

function toSpecification(entry: unknown): Specification | null {
  if (typeof entry === "string") {
    const [label, ...rest] = entry.split(":");
    const value = rest.join(":").trim();
    return label.trim() && value ? { label: label.trim(), value } : null;
  }
  if (
    entry &&
    typeof entry === "object" &&
    "label" in entry &&
    "value" in entry
  ) {
    return { label: String(entry.label), value: String(entry.value) };
  }
  return null;
}

export function normalizeSpecifications(
  metafield: ShopifyProduct["specifications"],
): Specification[] {
  if (!metafield?.value) return [];

  let entries: unknown[];
  try {
    const parsed: unknown = JSON.parse(metafield.value);
    entries = Array.isArray(parsed)
      ? parsed
      : parsed && typeof parsed === "object"
        ? Object.entries(parsed).map(([label, value]) => ({ label, value }))
        : [];
  } catch {
    entries = metafield.value.split("\n");
  }

  return entries.flatMap((entry) => toSpecification(entry) ?? []);
}

export function normalizeProduct(
  product: ShopifyProduct,
  categoryHandles: string[],
): Product {
  const collections = product.collections.nodes;
  const category =
    collections.find((collection) =>
      categoryHandles.includes(collection.handle),
    ) ??
    collections[0] ??
    null;

  return {
    ...normalizeProductSummary(product),
    vendor: product.vendor,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    images: product.images.nodes.flatMap(
      (image) => normalizeImage(image, product.title) ?? [],
    ),
    options: normalizeOptions(product.options),
    variants: product.variants.nodes.map((variant) =>
      normalizeVariant(variant, product.title),
    ),
    specifications: normalizeSpecifications(product.specifications),
    collection: category && { handle: category.handle, title: category.title },
    seo: {
      title: product.seo.title || product.title,
      description: product.seo.description || product.description,
    },
  };
}

export function normalizeCollection(collection: ShopifyCollection): Collection {
  return {
    id: collection.id,
    handle: collection.handle,
    title: collection.title,
    description: collection.description,
    image: normalizeImage(collection.image, collection.title),
    seo: {
      title: collection.seo.title || collection.title,
      description: collection.seo.description || collection.description,
    },
  };
}

const filterTypes: Record<ShopifyFilter["type"], Filter["type"]> = {
  LIST: "list",
  PRICE_RANGE: "price-range",
  BOOLEAN: "boolean",
};

export function normalizeFilters(filters: ShopifyFilter[]): Filter[] {
  return filters.map((filter) => ({
    id: filter.id,
    label: filter.label,
    type: filterTypes[filter.type],
    values: filter.values.map((value) => ({
      id: value.id,
      label: value.label,
      count: value.count,
      input: JSON.parse(value.input) as ProductFilter,
      swatch: value.swatch?.color ?? null,
    })),
  }));
}

function countFromAvailability(filters: ShopifyFilter[]) {
  const availability = filters.find(
    (filter) => filter.id === AVAILABILITY_FILTER,
  );
  return availability
    ? availability.values.reduce((total, value) => total + value.count, 0)
    : null;
}

export function normalizeProductConnection(connection: {
  nodes: (ShopifyProductCard | Record<string, never>)[];
  filters: ShopifyFilter[];
  pageInfo: ShopifyPageInfo;
  totalCount?: number;
}): ProductConnection {
  return {
    products: connection.nodes
      .filter((node): node is ShopifyProductCard => "id" in node)
      .map(normalizeProductSummary),
    filters: normalizeFilters(connection.filters),
    pageInfo: connection.pageInfo satisfies PageInfo,
    totalCount:
      connection.totalCount ?? countFromAvailability(connection.filters),
  };
}

export const emptyConnection: ProductConnection = {
  products: [],
  filters: [],
  pageInfo: { hasNextPage: false, endCursor: null },
  totalCount: 0,
};

function toInternalPath(url: string | null) {
  if (!url) return routes.home;

  const parsed = new URL(url, "https://tienda.local");
  const [, type, handle] = parsed.pathname.split("/");

  if (!type) return routes.home;
  if (type === "collections" && handle)
    return routes.collection(handle === "all" ? "todo" : handle);
  if (type === "products" && handle) return routes.product(handle);
  if (type === "pages" && handle) return routes.page(handle);
  if (type === "search") return `${routes.search}${parsed.search}`;
  return parsed.hostname === "tienda.local" ? parsed.pathname : url;
}

export function normalizeMenu(items: ShopifyMenuItem[]): MenuItem[] {
  return items.map((item) => ({
    title: item.title,
    path: toInternalPath(item.url),
    items: normalizeMenu(item.items ?? []),
  }));
}

export function normalizePage(page: ShopifyPage): Page {
  return {
    id: page.id,
    handle: page.handle,
    title: page.title,
    body: page.body,
    seo: {
      title: page.seo.title || page.title,
      description: page.seo.description || "",
    },
  };
}

function normalizeCartLine(line: ShopifyCartLine): CartLine {
  const { merchandise } = line;
  const options = selectedOptions(merchandise.selectedOptions);

  return {
    id: line.id,
    quantity: line.quantity,
    cost: line.cost.totalAmount,
    merchandise: {
      id: merchandise.id,
      title: options.length > 0 ? merchandise.title : merchandise.product.title,
      selectedOptions: options,
      image: normalizeImage(
        merchandise.image ?? merchandise.product.featuredImage,
        merchandise.product.title,
      ),
      product: {
        handle: merchandise.product.handle,
        title: merchandise.product.title,
      },
    },
  };
}

export function normalizeCart(cart: ShopifyCart): Cart {
  const { subtotalAmount, totalAmount } = cart.cost;
  const discount = cart.discountAllocations.reduce(
    (total, allocation) => total + toCents(allocation.discountedAmount),
    0,
  );

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    lines: cart.lines.nodes.map(normalizeCartLine),
    subtotal: subtotalAmount,
    total: totalAmount,
    discount:
      discount > 0 ? fromCents(discount, subtotalAmount.currencyCode) : null,
    discountCodes: cart.discountCodes,
  };
}

const regionNames = new Intl.DisplayNames(["es"], { type: "region" });

export function normalizeCountries(countries: ShopifyCountry[]): Country[] {
  return countries
    .map((country) => ({
      isoCode: country.isoCode,
      name: country.name || regionNames.of(country.isoCode) || country.isoCode,
      currencyCode: country.currency.isoCode,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export function normalizePaymentMethods({
  acceptedCardBrands,
  supportedDigitalWallets,
}: ShopifyPaymentSettings): string[] {
  return [
    ...new Set(
      [...acceptedCardBrands, ...supportedDigitalWallets].flatMap(
        (method) => paymentNames[method] ?? [],
      ),
    ),
  ];
}
