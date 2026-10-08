import { document } from "../document";
import { filterFragment } from "../fragments/collection";
import { imageFragment } from "../fragments/image";
import { productCardFragment } from "../fragments/product";

export const searchProductsQuery = document(
  `
  query SearchProducts(
    $query: String!
    $first: Int!
    $after: String
    $sortKey: SearchSortKeys
    $reverse: Boolean
    $filters: [ProductFilter!]
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    search(
      query: $query
      first: $first
      after: $after
      sortKey: $sortKey
      reverse: $reverse
      types: [PRODUCT]
      productFilters: $filters
      unavailableProducts: LAST
    ) {
      totalCount
      productFilters {
        ...Filter
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on Product {
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
