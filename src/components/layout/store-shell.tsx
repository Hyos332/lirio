import type { ReactNode } from "react";

import { AnnouncementBar } from "./announcement-bar";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type StoreShellProps = { children: ReactNode; headerBordered?: boolean };

export function StoreShell({
  children,
  headerBordered = true,
}: StoreShellProps) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-pill focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Saltar al contenido
      </a>
      <AnnouncementBar />
      <SiteHeader bordered={headerBordered} />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
