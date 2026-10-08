import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { accountUrl, getMenu } from "@/lib/commerce";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

import { ActiveNavList } from "./active-nav-list";
import { CartIcon, CartLink } from "./cart-link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NavList } from "./nav-list";

const navStyles = {
  className: "flex items-center gap-8",
  linkClassName: "inline-flex min-h-11 items-center text-md text-ink-2",
};

export async function SiteHeader({ bordered }: { bordered: boolean }) {
  const items = await getMenu("main-menu");

  return (
    <header>
      <Container
        className={cn(
          "grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-22",
          bordered && "border-b border-line",
        )}
      >
        <div className="flex items-center">
          <MobileMenu items={items} />
          <div className="hidden lg:block">
            <Logo />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="lg:hidden">
            <Logo />
          </div>
          <nav aria-label="Principal" className="hidden lg:block">
            <Suspense fallback={<NavList items={items} {...navStyles} />}>
              <ActiveNavList items={items} {...navStyles} />
            </Suspense>
          </nav>
        </div>

        <div className="-mr-2.5 flex items-center justify-end lg:gap-2">
          <IconButton href={routes.search} icon="search" label="Buscar" />
          {accountUrl && (
            <div className="hidden lg:block">
              <IconButton href={accountUrl} icon="user" label="Mi cuenta" />
            </div>
          )}
          <Suspense fallback={<CartIcon count={0} />}>
            <CartLink />
          </Suspense>
        </div>
      </Container>
    </header>
  );
}
