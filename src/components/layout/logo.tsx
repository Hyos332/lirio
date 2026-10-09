import Link from "next/link";

import { Lily } from "@/components/brand/lily";
import { store } from "@/config/store";
import { routes } from "@/lib/routes";

export function Logo() {
  return (
    <Link
      href={routes.home}
      aria-label={`${store.name}, ir al inicio`}
      className="group inline-flex min-h-11 items-center gap-1.5 font-display text-logo text-ink italic"
    >
      <Lily
        variant="mark"
        trigger="none"
        className="size-7 origin-bottom text-accent transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
      />
      {store.name.toLowerCase()}
    </Link>
  );
}
