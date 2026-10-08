"use client";

import { usePathname } from "next/navigation";

import { NavList, type NavListProps } from "./nav-list";

export function ActiveNavList(props: Omit<NavListProps, "activePath">) {
  return <NavList {...props} activePath={usePathname()} />;
}
