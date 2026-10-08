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
        className="h-70 rounded-card"
      />
      <span className="mt-4 flex items-center justify-between text-lg">
        {category.title}
        <Icon
          name="arrow-right"
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
