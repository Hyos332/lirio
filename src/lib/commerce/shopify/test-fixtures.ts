import type {
  ShopifyCart,
  ShopifyFilter,
  ShopifyImage,
  ShopifyMenuItem,
  ShopifyProduct,
  ShopifyProductCard,
} from "./types";

const eur = (amount: string) => ({ amount, currencyCode: "EUR" });

const image = (name: string, altText: string | null = null): ShopifyImage => ({
  url: `https://cdn.shopify.com/s/files/1/0000/${name}.jpg`,
  altText,
  width: 1200,
  height: 1200,
});

export const productCard: ShopifyProductCard = {
  id: "gid://shopify/Product/1",
  handle: "audifonos-inalambricos",
  title: "Audífonos inalámbricos",
  productType: "Audífonos",
  tags: ["mas-vendido"],
  availableForSale: true,
  featuredImage: image("audifonos"),
  priceRange: { minVariantPrice: eur("99.0") },
  compareAtPriceRange: { minVariantPrice: eur("0.0") },
  subtitle: { value: "Cancelación de ruido" },
};

export const productOnSale: ShopifyProductCard = {
  ...productCard,
  id: "gid://shopify/Product/2",
  handle: "parlante",
  subtitle: null,
  featuredImage: null,
  priceRange: { minVariantPrice: eur("49.99") },
  compareAtPriceRange: { minVariantPrice: eur("69.99") },
};

export const product: ShopifyProduct = {
  ...productCard,
  vendor: "Lirio",
  description: "Sonido equilibrado.",
  descriptionHtml: "<p>Sonido equilibrado.</p>",
  images: {
    nodes: [image("audifonos", "Audífonos negros"), image("audifonos-2")],
  },
  options: [
    {
      name: "Color",
      optionValues: [
        { name: "Negro", swatch: { color: "#111214" } },
        { name: "Blanco", swatch: null },
      ],
    },
  ],
  variants: {
    nodes: [
      {
        id: "gid://shopify/ProductVariant/11",
        title: "Negro",
        availableForSale: true,
        selectedOptions: [{ name: "Color", value: "Negro" }],
        price: eur("99.0"),
        compareAtPrice: eur("129.0"),
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/12",
        title: "Blanco",
        availableForSale: false,
        selectedOptions: [{ name: "Color", value: "Blanco" }],
        price: eur("99.0"),
        compareAtPrice: null,
        image: image("audifonos-blanco"),
      },
    ],
  },
  specifications: {
    type: "json",
    value:
      '[{"label":"Conectividad","value":"Bluetooth 5.3"},{"label":"Autonomía","value":"30 h"}]',
  },
  collections: {
    nodes: [
      { handle: "todo", title: "Todos los productos" },
      { handle: "audio", title: "Audio" },
    ],
  },
  seo: { title: null, description: null },
};

export const singleVariantProduct: ShopifyProduct = {
  ...product,
  options: [
    { name: "Title", optionValues: [{ name: "Default Title", swatch: null }] },
  ],
  variants: {
    nodes: [
      {
        id: "gid://shopify/ProductVariant/21",
        title: "Default Title",
        availableForSale: true,
        selectedOptions: [{ name: "Title", value: "Default Title" }],
        price: eur("19.99"),
        compareAtPrice: null,
        image: null,
      },
    ],
  },
  specifications: null,
  collections: { nodes: [] },
};

export const filters: ShopifyFilter[] = [
  {
    id: "filter.p.product_type",
    label: "Tipo",
    type: "LIST",
    values: [
      {
        id: "filter.p.product_type.Audífonos",
        label: "Audífonos",
        count: 3,
        input: '{"productType":"Audífonos"}',
        swatch: null,
      },
    ],
  },
  {
    id: "filter.v.price",
    label: "Precio",
    type: "PRICE_RANGE",
    values: [
      {
        id: "filter.v.price",
        label: "Precio",
        count: 0,
        input: '{"price":{"min":0,"max":199}}',
        swatch: null,
      },
    ],
  },
  {
    id: "filter.v.option.color",
    label: "Color",
    type: "LIST",
    values: [
      {
        id: "filter.v.option.color.negro",
        label: "Negro",
        count: 2,
        input: '{"variantOption":{"name":"color","value":"Negro"}}',
        swatch: { color: "#111214" },
      },
    ],
  },
  {
    id: "filter.v.availability",
    label: "Disponibilidad",
    type: "LIST",
    values: [
      {
        id: "filter.v.availability.1",
        label: "En stock",
        count: 5,
        input: '{"available":true}',
        swatch: null,
      },
      {
        id: "filter.v.availability.0",
        label: "Agotado",
        count: 2,
        input: '{"available":false}',
        swatch: null,
      },
    ],
  },
];

export const menu: ShopifyMenuItem[] = [
  { title: "Inicio", url: "https://lirio.example/" },
  {
    title: "Audio",
    url: "https://tienda.myshopify.com/collections/audio",
    items: [{ title: "Audífonos", url: "/products/audifonos-inalambricos" }],
  },
  { title: "Todo", url: "/collections/all" },
  { title: "Envíos", url: "/pages/envios" },
  { title: "Buscar", url: "/search?q=cargador" },
  { title: "Instagram", url: "https://instagram.com/lirio" },
  { title: "Sin enlace", url: null },
];

export const cart: ShopifyCart = {
  id: "gid://shopify/Cart/abc?key=123",
  checkoutUrl: "https://tienda.myshopify.com/cart/c/abc",
  totalQuantity: 3,
  cost: { subtotalAmount: eur("139.0"), totalAmount: eur("125.1") },
  discountCodes: [
    { code: "PRUEBA10", applicable: true },
    { code: "FALSO", applicable: false },
  ],
  discountAllocations: [
    { discountedAmount: eur("10.0") },
    { discountedAmount: eur("3.9") },
  ],
  lines: {
    nodes: [
      {
        id: "gid://shopify/CartLine/1",
        quantity: 1,
        cost: { totalAmount: eur("99.0") },
        merchandise: {
          id: "gid://shopify/ProductVariant/11",
          title: "Negro",
          selectedOptions: [{ name: "Color", value: "Negro" }],
          image: image("audifonos-negro"),
          product: {
            handle: "audifonos",
            title: "Audífonos",
            featuredImage: image("audifonos"),
          },
        },
      },
      {
        id: "gid://shopify/CartLine/2",
        quantity: 2,
        cost: { totalAmount: eur("40.0") },
        merchandise: {
          id: "gid://shopify/ProductVariant/21",
          title: "Default Title",
          selectedOptions: [{ name: "Title", value: "Default Title" }],
          image: null,
          product: {
            handle: "cable",
            title: "Cable USB-C",
            featuredImage: image("cable"),
          },
        },
      },
    ],
  },
};
