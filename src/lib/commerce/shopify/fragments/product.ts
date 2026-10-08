export const productCardFragment = `
  fragment ProductCard on Product {
    id
    handle
    title
    productType
    tags
    availableForSale
    featuredImage {
      ...Image
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    subtitle: metafield(namespace: "custom", key: "subtitulo") {
      value
    }
  }
`;

export const variantFragment = `
  fragment Variant on ProductVariant {
    id
    title
    availableForSale
    selectedOptions {
      name
      value
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    image {
      ...Image
    }
  }
`;

export const productDetailFragment = `
  fragment ProductDetail on Product {
    ...ProductCard
    vendor
    description
    descriptionHtml
    images(first: 20) {
      nodes {
        ...Image
      }
    }
    options {
      name
      optionValues {
        name
        swatch {
          color
        }
      }
    }
    variants(first: 250) {
      nodes {
        ...Variant
      }
    }
    specifications: metafield(namespace: "custom", key: "especificaciones") {
      type
      value
    }
    collections(first: 10) {
      nodes {
        handle
        title
      }
    }
    seo {
      title
      description
    }
  }
`;
