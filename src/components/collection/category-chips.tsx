import Link from "next/link";

import type { Collection } from "@/lib/commerce/types";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

type CategoryChipsProps = {
  categories: Collection[];
  activeHandle?: string;
  className?: string;
};

export function CategoryChips({
  categories,
  activeHandle,
  className,
}: CategoryChipsProps) {
  return (
    <ul
      className={cn(
        "-mx-4 flex [scrollbar-width:none] gap-2.5 overflow-x-auto px-4",
        className,
      )}
    >
      {categories.map((category) => (
        <li key={category.handle} className="shrink-0">
          <Link
            href={routes.collection(category.handle)}
            aria-current={category.handle === activeHandle ? "page" : undefined}
            className="inline-flex h-11 items-center rounded-pill border border-line-strong px-5 text-md transition-colors hover:border-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-white"
          >
            {category.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
