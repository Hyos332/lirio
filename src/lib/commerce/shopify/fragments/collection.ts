export const collectionFragment = `
  fragment Collection on Collection {
    id
    handle
    title
    description
    image {
      ...Image
    }
    seo {
      title
      description
    }
  }
`;

export const filterFragment = `
  fragment Filter on Filter {
    id
    label
    type
    values {
      id
      label
      count
      input
      swatch {
        color
      }
    }
  }
`;
