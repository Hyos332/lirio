import { Fragment } from "react";

type BlurTextProps = {
  text: string;
  as?: "h1" | "h2" | "p";
  stagger?: number;
  className?: string;
};

export function BlurText({
  text,
  as: Tag = "p",
  stagger = 70,
  className,
}: BlurTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <Fragment key={index}>
          <span
            className="inline-block animate-blur-in"
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
