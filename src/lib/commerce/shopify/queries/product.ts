import { document } from "../document";
import { imageFragment } from "../fragments/image";
import {
  productCardFragment,
  productDetailFragment,
  variantFragment,
} from "../fragments/product";

export const productQuery = document(
  `
  query Product($handle: String!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductDetail
    }
  }
`,
  productDetailFragment,
  productCardFragment,
  variantFragment,
  imageFragment,
);

export const productRecommendationsQuery = document(
  `
  query ProductRecommendations($productId: ID!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    productRecommendations(productId: $productId, intent: RELATED) {
      ...ProductCard
    }
  }
`,
  productCardFragment,
  imageFragment,
);
