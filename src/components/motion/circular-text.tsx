import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { slugify } from "@/lib/text";

const RADIUS = 38;
const CIRCUMFERENCE = Math.round(2 * Math.PI * RADIUS);

type CircularTextProps = {
  text: string;
  children?: ReactNode;
  className?: string;
};

export function CircularText({ text, children, className }: CircularTextProps) {
  const pathId = `circulo-${slugify(text)}`;

  return (
    <div
      aria-hidden
      className={cn(
        "group relative grid place-items-center rounded-pill bg-bg",
        className,
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full animate-spin-slow group-hover:[animation-play-state:paused]"
      >
        <defs>
          <path
            id={pathId}
            d={`M50,50 m-${RADIUS},0 a${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
          />
        </defs>
        <text fontSize="7" className="fill-ink font-mono uppercase">
          <textPath
            href={`#${pathId}`}
            textLength={CIRCUMFERENCE}
            lengthAdjust="spacing"
          >
            {text}
          </textPath>
        </text>
      </svg>
      {children}
    </div>
  );
}
