import { Fragment } from "react";

import { cn } from "@/lib/cn";

type BlurTextProps = {
  text: string;
  highlight?: string;
  as?: "h1" | "h2" | "p";
  stagger?: number;
  className?: string;
  highlightClassName?: string;
};

export function BlurText({
  text,
  highlight = "",
  as: Tag = "p",
  stagger = 70,
  className,
  highlightClassName,
}: BlurTextProps) {
  const words = [text, highlight].join(" ").trim().split(" ");
  const firstHighlighted = text.split(" ").length;

  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <Fragment key={index}>
          <span
            className={cn(
              "inline-block animate-blur-in",
              index >= firstHighlighted && highlightClassName,
            )}
            style={{ animationDelay: `${index * stagger}ms` }}
          >
            {word}
          </span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
