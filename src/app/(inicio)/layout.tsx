import { StoreShell } from "@/components/layout/store-shell";

export default function HomeLayout({ children }: LayoutProps<"/">) {
  return <StoreShell headerBordered={false}>{children}</StoreShell>;
}
