import Link from "next/link";

import { store } from "@/config/store";
import { routes } from "@/lib/routes";

export function Logo() {
  return (
    <Link
      href={routes.home}
      aria-label={`${store.name}, ir al inicio`}
      className="inline-flex min-h-11 items-center text-logo"
    >
      {store.name.toLowerCase()}
      <span className="text-accent">.</span>
    </Link>
  );
}
