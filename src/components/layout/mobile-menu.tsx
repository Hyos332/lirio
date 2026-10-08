"use client";

import { useState } from "react";

import { Drawer } from "@/components/ui/drawer";
import { IconButton } from "@/components/ui/icon-button";
import type { MenuItem } from "@/lib/commerce/types";

import { NavList } from "./nav-list";

export function MobileMenu({ items }: { items: MenuItem[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <IconButton
        icon="menu"
        label="Abrir menú"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="-ml-2.5 lg:hidden"
      />
      <Drawer open={open} onClose={close} title="Menú" side="left">
        <nav aria-label="Principal">
          <NavList
            items={items}
            onNavigate={close}
            className="px-4"
            linkClassName="flex h-14 items-center border-b border-line text-lg text-ink-2"
          />
        </nav>
      </Drawer>
    </>
  );
}
