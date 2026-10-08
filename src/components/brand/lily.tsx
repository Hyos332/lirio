import { cn } from "@/lib/cn";

const bloom = {
  viewBox: "0 0 200 260",
  petals: [
    "M100 252 C100 214 99 176 100 136",
    "M100 214 C84 206 70 190 64 168 C80 174 94 190 100 206",
    "M100 188 C116 180 128 164 132 144 C118 150 106 164 100 180",
    "M100 136 C88 110 87 80 100 44 C113 80 112 110 100 136 Z",
    "M97 134 C70 126 46 108 36 80 C32 68 38 60 48 66 C64 76 80 104 96 128",
    "M103 134 C130 126 154 108 164 80 C168 68 162 60 152 66 C136 76 120 104 104 128",
    "M95 128 C82 104 74 80 74 54",
    "M105 128 C118 104 126 80 126 54",
  ],
  stamens: [
    "M100 124 C94 108 86 98 76 92",
    "M100 124 C106 108 114 98 124 92",
    "M100 122 L100 84",
  ],
  anthers: [
    [76, 92],
    [124, 92],
    [100, 82],
  ],
  anther: 2.4,
};

const mark = {
  viewBox: "0 0 24 24",
  petals: [
    "M12 23 L12 13",
    "M12 13 C10.6 10 10.6 6.5 12 3 C13.4 6.5 13.4 10 12 13 Z",
    "M11.6 12.6 C8.4 11.6 5.6 9.6 4.6 6.4 C4.3 5.4 5 4.8 5.9 5.4 C7.8 6.6 9.8 9.4 11.5 12.2",
    "M12.4 12.6 C15.6 11.6 18.4 9.6 19.4 6.4 C19.7 5.4 19 4.8 18.1 5.4 C16.2 6.6 14.2 9.4 12.5 12.2",
  ],
  stamens: [],
  anthers: [[12, 13]],
  anther: 0.9,
};

type LilyProps = {
  variant?: "bloom" | "mark";
  trigger?: "load" | "scroll" | "none";
  sway?: boolean;
  className?: string;
};

export function Lily({
  variant = "bloom",
  trigger = "load",
  sway = false,
  className,
}: LilyProps) {
  const shape = variant === "bloom" ? bloom : mark;
  const paths = [
    ...shape.petals.map((d) => ({ d, accent: false })),
    ...shape.stamens.map((d) => ({ d, accent: true })),
  ];
  const drawClassName = cn(
    trigger !== "none" && "animate-draw [stroke-dasharray:1]",
    trigger === "scroll" && "draw-on-scroll",
  );

  return (
    <svg
      aria-hidden
      viewBox={shape.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(sway && "origin-bottom animate-sway", className)}
    >
      {paths.map(({ d, accent }, index) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          className={cn(drawClassName, accent && "text-accent")}
          style={
            trigger === "load"
              ? { animationDelay: `${index * 110}ms` }
              : undefined
          }
        />
      ))}
      {shape.anthers.map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={shape.anther}
          stroke="none"
          className={cn(
            "fill-accent",
            trigger === "load" && "animate-fade-in [animation-delay:1.2s]",
            trigger === "scroll" && "animate-fade-in draw-on-scroll",
          )}
        />
      ))}
    </svg>
  );
}
