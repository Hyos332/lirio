export const menuQuery = `
  query Menu($handle: String!, $language: LanguageCode) @inContext(language: $language) {
    menu(handle: $handle) {
      items {
        title
        url
        items {
          title
          url
        }
      }
    }
  }
`;

export const pageQuery = `
  query Page($handle: String!, $language: LanguageCode) @inContext(language: $language) {
    page(handle: $handle) {
      id
      handle
      title
      body
      seo {
        title
        description
      }
    }
  }
`;
