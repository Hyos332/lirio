"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Icon } from "@/components/ui/icon";
import type {
  CatalogBase,
  CatalogState,
  FilterGroup,
} from "@/lib/catalog/state";

import { FilterPanel } from "./filter-panel";

type MobileFiltersProps = {
  base: CatalogBase;
  state: CatalogState;
  groups: FilterGroup[];
};

export function MobileFilters(props: MobileFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Icon name="filter" size={18} />
        Filtrar
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Filtros"
        side="left"
        footer={
          <Button fullWidth onClick={() => setOpen(false)}>
            Ver resultados
          </Button>
        }
      >
        <div className="p-4">
          <FilterPanel {...props} />
        </div>
      </Drawer>
    </>
  );
}
