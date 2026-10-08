"use client";

import { useId, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  clearFilters,
  hasActiveFilters,
  parseAmount,
  toggleOption,
  type CatalogBase,
  type CatalogState,
  type FilterGroup,
} from "@/lib/catalog/state";

import { useCatalogNavigation } from "./use-catalog-navigation";

type ListGroup = Extract<FilterGroup, { kind: "list" }>;

type OptionsProps = {
  group: ListGroup;
  selected: string[];
  onToggle: (value: string) => void;
};

function CheckboxOptions({ group, selected, onToggle }: OptionsProps) {
  return (
    <ul>
      {group.options.map((option) => (
        <li key={option.value}>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 text-md text-ink-2 transition-colors hover:text-ink lg:min-h-9">
            <span className="relative flex size-5 shrink-0 items-center justify-center">
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => onToggle(option.value)}
                className="peer size-5 cursor-pointer appearance-none rounded-checkbox border border-line-strong bg-surface transition-colors checked:border-ink checked:bg-ink"
              />
              <Icon
                name="check"
                size={14}
                strokeWidth={2}
                className="pointer-events-none absolute text-white opacity-0 peer-checked:opacity-100"
              />
            </span>
            {option.label}
          </label>
        </li>
      ))}
    </ul>
  );
}

function SwatchOptions({ group, selected, onToggle }: OptionsProps) {
  return (
    <ul className="-ml-1.5 flex flex-wrap">
      {group.options.map((option) => (
        <li key={option.value}>
          <label
            title={option.label}
            className="flex size-11 cursor-pointer items-center justify-center"
          >
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={() => onToggle(option.value)}
              className="peer sr-only"
            />
            <span
              aria-hidden
              style={{ backgroundColor: option.swatch ?? undefined }}
              className="size-8 rounded-pill border border-line-strong ring-ink ring-offset-2 ring-offset-bg transition-shadow peer-checked:ring-2 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent"
            />
            <span className="sr-only">{option.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

function ListOptions(props: OptionsProps) {
  return props.group.swatches ? (
    <SwatchOptions {...props} />
  ) : (
    <CheckboxOptions {...props} />
  );
}

type PriceRangeProps = {
  price: CatalogState["price"];
  onApply: (price: CatalogState["price"]) => void;
};

function PriceRange({ price, onApply }: PriceRangeProps) {
  const minId = useId();
  const maxId = useId();

  function apply(form: HTMLFormElement) {
    const data = new FormData(form);
    const next = {
      min: parseAmount(data.get("min")),
      max: parseAmount(data.get("max")),
    };
    if (next.min !== price.min || next.max !== price.max) onApply(next);
  }

  return (
    <form
      key={`${price.min}-${price.max}`}
      onSubmit={(event) => {
        event.preventDefault();
        apply(event.currentTarget);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          apply(event.currentTarget);
      }}
      className="grid grid-cols-2 gap-2"
    >
      <label htmlFor={minId} className="sr-only">
        Precio mínimo
      </label>
      <Input
        id={minId}
        name="min"
        type="number"
        inputMode="decimal"
        min={0}
        step="any"
        placeholder="Mín."
        defaultValue={price.min ?? ""}
        shape="rounded"
        size="sm"
      />
      <label htmlFor={maxId} className="sr-only">
        Precio máximo
      </label>
      <Input
        id={maxId}
        name="max"
        type="number"
        inputMode="decimal"
        min={0}
        step="any"
        placeholder="Máx."
        defaultValue={price.max ?? ""}
        shape="rounded"
        size="sm"
      />
      <button type="submit" className="sr-only">
        Aplicar precio
      </button>
    </form>
  );
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2 text-md font-medium">{label}</legend>
      {children}
    </fieldset>
  );
}

type FilterPanelProps = {
  base: CatalogBase;
  state: CatalogState;
  groups: FilterGroup[];
};

export function FilterPanel({ base, state, groups }: FilterPanelProps) {
  const { current, navigate } = useCatalogNavigation(base, state);

  return (
    <div className="flex flex-col gap-7">
      {groups.map((group) => (
        <Group key={group.key} label={group.label}>
          {group.kind === "price" ? (
            <PriceRange
              price={current.price}
              onApply={(price) => navigate({ ...current, price, page: 1 })}
            />
          ) : (
            <ListOptions
              group={group}
              selected={current.selected[group.key] ?? []}
              onToggle={(value) =>
                navigate(toggleOption(current, group.key, value))
              }
            />
          )}
        </Group>
      ))}
      <Button
        variant="secondary"
        size="sm"
        fullWidth
        disabled={!hasActiveFilters(current)}
        onClick={() => navigate(clearFilters(current))}
      >
        Limpiar filtros
      </Button>
    </div>
  );
}
