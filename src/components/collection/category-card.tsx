import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Picture } from "@/components/ui/picture";
import type { Collection } from "@/lib/commerce/types";
import { routes } from "@/lib/routes";

export function CategoryCard({ category }: { category: Collection }) {
  return (
    <Link href={routes.collection(category.handle)} className="group block">
      <Picture
        image={category.image}
        alt=""
        placeholder="Foto categoría"
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="h-70 rounded-card rounded-bl-checkbox transition duration-500 group-hover:-translate-y-1.5 group-hover:shadow-lift [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105"
      />
      <span className="mt-4 flex items-center justify-between font-display text-h2-sm transition-colors group-hover:text-accent">
        {category.title}
        <span className="grid size-10 place-items-center rounded-pill border border-line-strong text-ink transition duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <Icon
            name="arrow-right"
            size={18}
            className="transition-transform duration-300 group-hover:-rotate-45"
          />
        </span>
      </span>
    </Link>
  );
}
