import { cacheLife } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { footerNavigation } from "@/config/navigation";
import { store } from "@/config/store";

import { CountrySelector } from "./country-selector";
import { Logo } from "./logo";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="bg-surface-2">
      <Container className="grid gap-12 pt-16 pb-12 lg:grid-cols-[1fr_auto]">
        <div>
          <Logo />
          <p className="mt-3 max-w-56 text-sm text-muted">{store.tagline}</p>
        </div>
        <nav
          aria-label="Pie de página"
          className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:flex lg:gap-12"
        >
          {footerNavigation.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-medium">{column.title}</h2>
              <ul className="mt-2">
                {column.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="inline-flex min-h-11 items-center text-sm text-ink-2 transition-colors hover:text-ink lg:min-h-7"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>
      <Container className="flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          © <CurrentYear /> {store.name} · Todos los derechos reservados
        </p>
        <Suspense fallback={null}>
          <CountrySelector />
        </Suspense>
      </Container>
    </footer>
  );
}
