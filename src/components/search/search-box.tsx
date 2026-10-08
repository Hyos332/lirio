import Form from "next/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/lib/routes";

export function SearchBox({ query = "" }: { query?: string }) {
  return (
    <Form
      action={routes.search}
      role="search"
      className="mt-6 flex max-w-xl gap-2"
    >
      <label htmlFor="q" className="sr-only">
        Buscar productos
      </label>
      <Input
        key={query}
        id="q"
        name="q"
        type="search"
        defaultValue={query}
        placeholder="Busca audífonos, cargadores…"
        autoFocus={!query}
      />
      <Button type="submit" className="shrink-0">
        Buscar
      </Button>
    </Form>
  );
}
