import type { ReactNode } from "react";

import { Icon } from "./icon";

type AccordionProps = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function Accordion({
  title,
  defaultOpen = false,
  children,
}: AccordionProps) {
  return (
    <details open={defaultOpen} className="group border-b border-line">
      <summary className="flex min-h-14 cursor-pointer list-none items-center gap-2 text-base font-medium [&::-webkit-details-marker]:hidden">
        <Icon
          name="chevron-right"
          size={16}
          strokeWidth={2}
          className="transition-transform group-open:rotate-90"
        />
        {title}
      </summary>
      <div className="pb-6 pl-6">{children}</div>
    </details>
  );
}
