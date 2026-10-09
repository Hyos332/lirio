import type { ReactNode } from "react";

import { TextLink } from "./text-link";

type SectionHeadingProps = {
  id: string;
  title: ReactNode;
  action?: { href: string; label: string };
};

export function SectionHeading({ id, title, action }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 id={id} className="font-display text-h2-sm md:text-h2">
        {title}
      </h2>
      {action && (
        <TextLink href={action.href} className="shrink-0 text-md">
          {action.label}
        </TextLink>
      )}
    </div>
  );
}
