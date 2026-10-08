export const routes = {
  home: "/",
  cart: "/carrito",
  search: "/buscar",
  collection: (handle: string) => `/colecciones/${handle}`,
  product: (handle: string) => `/productos/${handle}`,
  page: (handle: string) => `/paginas/${handle}`,
};
