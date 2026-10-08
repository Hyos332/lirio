import { describe, expect, it } from "vitest";

import {
  catalogHref,
  clearFilters,
  collectionSorts,
  readCatalogState,
  toggleOption,
  type CatalogBase,
} from "./state";

const base: CatalogBase = {
  path: "/colecciones/audio",
  sorts: collectionSorts,
};
const read = (query: string) =>
  readCatalogState(new URLSearchParams(query), base, ["tipo", "color"]);

describe("readCatalogState", () => {
  it("lee filtros conocidos, precio, orden y página", () => {
    expect(
      read(
        "tipo=audifonos&color=negro&color=blanco&otro=x&precio_min=10&orden=precio-asc&pagina=2",
      ),
    ).toEqual({
      query: "",
      sort: "precio-asc",
      selected: { tipo: ["audifonos"], color: ["negro", "blanco"] },
      price: { min: 10, max: null },
      page: 2,
    });
  });

  it("usa valores seguros cuando la URL trae datos inválidos", () => {
    const state = read("orden=inventado&pagina=-4&precio_max=abc");
    expect(state.sort).toBe("mas-vendidos");
    expect(state.page).toBe(1);
    expect(state.price.max).toBeNull();
    expect(read("pagina=999").page).toBe(20);
  });
});

describe("catalogHref", () => {
  it("omite los valores por defecto y conserva el resto", () => {
    expect(catalogHref(base, read(""))).toBe("/colecciones/audio");
    const query = "tipo=audifonos&precio_max=60&orden=precio-desc&pagina=3";
    expect(catalogHref(base, read(query))).toBe(`/colecciones/audio?${query}`);
  });

  it("al limpiar filtros mantiene el orden y vuelve a la primera página", () => {
    expect(
      catalogHref(
        base,
        clearFilters(read("tipo=audifonos&orden=nuevos&pagina=2")),
      ),
    ).toBe("/colecciones/audio?orden=nuevos");
  });
});

describe("toggleOption", () => {
  it("agrega y quita valores y reinicia la página", () => {
    const added = toggleOption(read("pagina=3"), "color", "negro");
    expect(added.selected).toEqual({ color: ["negro"] });
    expect(added.page).toBe(1);
    expect(toggleOption(added, "color", "negro").selected).toEqual({});
  });
});
