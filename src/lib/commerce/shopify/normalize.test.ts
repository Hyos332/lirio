import { describe, expect, it } from "vitest";

import {
  normalizeCart,
  normalizeCountries,
  normalizeFilters,
  normalizeMenu,
  normalizePaymentMethods,
  normalizeProduct,
  normalizeProductConnection,
  normalizeProductSummary,
  normalizeSpecifications,
} from "./normalize";
import {
  cart,
  filters,
  menu,
  product,
  productCard,
  productOnSale,
  singleVariantProduct,
} from "./test-fixtures";

const categories = ["audio", "carga"];
const pageInfo = { hasNextPage: true, endCursor: "cursor" };

describe("normalizeProductSummary", () => {
  it("ignora el precio de comparación en cero y conserva el subtítulo", () => {
    const summary = normalizeProductSummary(productCard);
    expect(summary.compareAtPrice).toBeNull();
    expect(summary.subtitle).toBe("Cancelación de ruido");
    expect(summary.featuredImage?.altText).toBe("Audífonos inalámbricos");
  });

  it("mantiene el precio anterior cuando es mayor que el actual", () => {
    const summary = normalizeProductSummary(productOnSale);
    expect(summary.compareAtPrice).toEqual({
      amount: "69.99",
      currencyCode: "EUR",
    });
    expect(summary.subtitle).toBeNull();
    expect(summary.featuredImage).toBeNull();
  });
});

describe("normalizeProduct", () => {
  it("elige como colección la primera que es una categoría", () => {
    expect(normalizeProduct(product, categories).collection).toEqual({
      handle: "audio",
      title: "Audio",
    });
  });

  it("normaliza opciones, swatches y variantes", () => {
    const normalized = normalizeProduct(product, categories);
    expect(normalized.options).toEqual([
      {
        name: "Color",
        values: [
          { name: "Negro", swatch: "#111214" },
          { name: "Blanco", swatch: null },
        ],
      },
    ]);
    expect(normalized.variants[0].compareAtPrice).toEqual({
      amount: "129.0",
      currencyCode: "EUR",
    });
    expect(normalized.variants[1].image?.url).toContain("audifonos-blanco");
    expect(normalized.images).toHaveLength(2);
    expect(normalized.seo).toEqual({
      title: "Audífonos inalámbricos",
      description: "Sonido equilibrado.",
    });
  });

  it("quita la opción Default Title de los productos sin variantes", () => {
    const normalized = normalizeProduct(singleVariantProduct, categories);
    expect(normalized.options).toEqual([]);
    expect(normalized.variants[0].selectedOptions).toEqual([]);
    expect(normalized.variants[0].title).toBe("Audífonos inalámbricos");
    expect(normalized.collection).toBeNull();
    expect(normalized.specifications).toEqual([]);
  });
});

describe("normalizeSpecifications", () => {
  it("lee una lista JSON de etiqueta y valor", () => {
    expect(normalizeSpecifications(product.specifications)).toEqual([
      { label: "Conectividad", value: "Bluetooth 5.3" },
      { label: "Autonomía", value: "30 h" },
    ]);
  });

  it("lee un objeto JSON", () => {
    expect(
      normalizeSpecifications({ type: "json", value: '{"Peso":"250 g"}' }),
    ).toEqual([{ label: "Peso", value: "250 g" }]);
  });

  it("lee una lista de textos con el formato Etiqueta: Valor", () => {
    expect(
      normalizeSpecifications({
        type: "list.single_line_text_field",
        value: '["Carga: USB-C","Hora: 10:30"]',
      }),
    ).toEqual([
      { label: "Carga", value: "USB-C" },
      { label: "Hora", value: "10:30" },
    ]);
  });

  it("lee texto de varias líneas e ignora las líneas sin valor", () => {
    expect(
      normalizeSpecifications({
        type: "multi_line_text_field",
        value: "Material: Aluminio\nSin formato",
      }),
    ).toEqual([{ label: "Material", value: "Aluminio" }]);
  });
});

describe("normalizeFilters", () => {
  it("convierte el tipo, interpreta el input y toma el color", () => {
    const [type, price, color] = normalizeFilters(filters);
    expect(type.type).toBe("list");
    expect(type.values[0].input).toEqual({ productType: "Audífonos" });
    expect(price.type).toBe("price-range");
    expect(color.values[0]).toMatchObject({
      input: { variantOption: { name: "color", value: "Negro" } },
      swatch: "#111214",
    });
  });
});

describe("normalizeProductConnection", () => {
  it("calcula el total con el filtro de disponibilidad si Shopify no lo envía", () => {
    const connection = normalizeProductConnection({
      nodes: [productCard],
      filters,
      pageInfo,
    });
    expect(connection.totalCount).toBe(7);
    expect(connection.pageInfo).toEqual(pageInfo);
    expect(connection.products).toHaveLength(1);
  });

  it("usa el total de la búsqueda y descarta resultados que no son productos", () => {
    const connection = normalizeProductConnection({
      nodes: [productCard, {}],
      filters: [],
      pageInfo,
      totalCount: 1,
    });
    expect(connection.totalCount).toBe(1);
    expect(connection.products.map((entry) => entry.handle)).toEqual([
      "audifonos-inalambricos",
    ]);
  });

  it("deja el total en null si no hay forma de calcularlo", () => {
    expect(
      normalizeProductConnection({ nodes: [], filters: [], pageInfo })
        .totalCount,
    ).toBeNull();
  });
});

describe("normalizeMenu", () => {
  it("convierte las URL de Shopify en rutas de la tienda", () => {
    expect(normalizeMenu(menu)).toEqual([
      { title: "Inicio", path: "/", items: [] },
      {
        title: "Audio",
        path: "/colecciones/audio",
        items: [
          {
            title: "Audífonos",
            path: "/productos/audifonos-inalambricos",
            items: [],
          },
        ],
      },
      { title: "Todo", path: "/colecciones/todo", items: [] },
      { title: "Envíos", path: "/paginas/envios", items: [] },
      { title: "Buscar", path: "/buscar?q=cargador", items: [] },
      { title: "Instagram", path: "https://instagram.com/lirio", items: [] },
      { title: "Sin enlace", path: "/", items: [] },
    ]);
  });
});

describe("normalizeCart", () => {
  it("suma los descuentos y conserva totales y códigos", () => {
    const normalized = normalizeCart(cart);
    expect(normalized.discount).toEqual({
      amount: "13.90",
      currencyCode: "EUR",
    });
    expect(normalized.subtotal).toEqual({
      amount: "139.0",
      currencyCode: "EUR",
    });
    expect(normalized.total).toEqual({ amount: "125.1", currencyCode: "EUR" });
    expect(normalized.discountCodes).toEqual(cart.discountCodes);
    expect(normalized.checkoutUrl).toBe(cart.checkoutUrl);
  });

  it("usa el producto cuando la variante no tiene opciones ni imagen", () => {
    const line = normalizeCart(cart).lines[1];
    expect(line.merchandise.title).toBe("Cable USB-C");
    expect(line.merchandise.selectedOptions).toEqual([]);
    expect(line.merchandise.image?.url).toContain("cable");
  });

  it("deja el descuento en null si no hay asignaciones", () => {
    expect(
      normalizeCart({ ...cart, discountAllocations: [] }).discount,
    ).toBeNull();
  });
});

describe("normalizePaymentMethods", () => {
  it("traduce los nombres, quita duplicados e ignora valores desconocidos", () => {
    expect(
      normalizePaymentMethods({
        acceptedCardBrands: ["VISA", "MASTERCARD", "OTRA"],
        supportedDigitalWallets: ["GOOGLE_PAY", "ANDROID_PAY", "SHOPIFY_PAY"],
      }),
    ).toEqual(["Visa", "Mastercard", "Google Pay", "Shop Pay"]);
  });
});

describe("normalizeCountries", () => {
  it("ordena los países por nombre en español", () => {
    expect(
      normalizeCountries([
        { isoCode: "MX", name: "México", currency: { isoCode: "MXN" } },
        { isoCode: "ES", name: "España", currency: { isoCode: "EUR" } },
        { isoCode: "CO", name: "Colombia", currency: { isoCode: "COP" } },
      ]).map((country) => country.isoCode),
    ).toEqual(["CO", "ES", "MX"]);
  });

  it("usa el nombre en español del país cuando Shopify no lo envía", () => {
    expect(
      normalizeCountries([
        { isoCode: "CA", name: "", currency: { isoCode: "CAD" } },
      ])[0].name,
    ).toBe("Canadá");
  });
});
