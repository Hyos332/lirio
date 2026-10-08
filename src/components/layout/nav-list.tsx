import Link from "next/link";

import type { MenuItem } from "@/lib/commerce/types";
import { cn } from "@/lib/cn";

export type NavListProps = {
  items: MenuItem[];
  activePath?: string | null;
  onNavigate?: () => void;
  className?: string;
  linkClassName?: string;
};

function isActive(path: string, activePath?: string | null) {
  return (
    !!activePath && (activePath === path || activePath.startsWith(`${path}/`))
  );
}

export function NavList({
  items,
  activePath,
  onNavigate,
  className,
  linkClassName,
}: NavListProps) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.path}>
          <Link
            href={item.path}
            onClick={onNavigate}
            aria-current={isActive(item.path, activePath) ? "page" : undefined}
            className={cn(
              "transition-colors hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-ink",
              linkClassName,
            )}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
