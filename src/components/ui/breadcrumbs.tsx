import Link from "next/link";

import { cn } from "@/lib/cn";

type Crumb = { title: string; href?: string };

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Migas de pan"
      className={cn("text-xs text-muted", className)}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <li key={item.title} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden>/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-ink"
              >
                {item.title}
              </Link>
            ) : (
              <span aria-current="page">{item.title}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
