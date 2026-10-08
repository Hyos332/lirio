import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type ContainerTag = "div" | "section" | "header" | "footer" | "main" | "nav";

type ContainerProps = ComponentProps<"div"> & { as?: ContainerTag };

export function Container({
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-page px-4 md:px-8", className)}
      {...props}
    />
  );
}
