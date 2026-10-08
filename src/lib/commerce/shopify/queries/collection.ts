import { document } from "../document";
import { collectionFragment, filterFragment } from "../fragments/collection";
import { imageFragment } from "../fragments/image";
import { productCardFragment } from "../fragments/product";

export const collectionsQuery = document(
  `
  query Collections($language: LanguageCode) @inContext(language: $language) {
    collections(first: 100) {
      nodes {
        ...Collection
      }
    }
  }
`,
  collectionFragment,
  imageFragment,
);

export const collectionQuery = document(
  `
  query Collection($handle: String!, $language: LanguageCode) @inContext(language: $language) {
    collection(handle: $handle) {
      ...Collection
    }
  }
`,
  collectionFragment,
  imageFragment,
);

export const collectionProductsQuery = document(
  `
  query CollectionProducts(
    $handle: String!
    $first: Int!
    $after: String
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $filters: [ProductFilter!]
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      products(
        first: $first
        after: $after
        sortKey: $sortKey
        reverse: $reverse
        filters: $filters
      ) {
        filters {
          ...Filter
        }
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ...ProductCard
        }
      }
    }
  }
`,
  filterFragment,
  productCardFragment,
  imageFragment,
);
