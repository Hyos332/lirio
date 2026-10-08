"use client";

import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";

import {
  catalogHref,
  type CatalogBase,
  type CatalogState,
} from "@/lib/catalog/state";

export function useCatalogNavigation(base: CatalogBase, state: CatalogState) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [current, setCurrent] = useOptimistic(state);

  function navigate(next: CatalogState) {
    startTransition(() => {
      setCurrent(next);
      router.push(catalogHref(base, next), { scroll: false });
    });
  }

  return { current, navigate, pending };
}
