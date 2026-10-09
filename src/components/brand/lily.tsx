import { cn } from "@/lib/cn";

type Shape = {
  viewBox: string;
  stem: string[];
  petals: string[];
  veins: string[];
  stamens: string[];
  anthers: [number, number][];
  anther: number;
};

const bloom: Shape = {
  viewBox: "0 0 200 260",
  stem: [
    "M100 252 C100 214 99 176 100 136",
    "M100 214 C84 206 70 190 64 168 C80 174 94 190 100 206",
    "M100 188 C116 180 128 164 132 144 C118 150 106 164 100 180",
  ],
  petals: [
    "M97 134 C70 126 46 108 36 80 C32 68 38 60 48 66 C64 76 80 104 96 128",
    "M103 134 C130 126 154 108 164 80 C168 68 162 60 152 66 C136 76 120 104 104 128",
    "M100 136 C88 110 87 80 100 44 C113 80 112 110 100 136 Z",
  ],
  veins: ["M95 128 C82 104 74 80 74 54", "M105 128 C118 104 126 80 126 54"],
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

const mark: Shape = {
  viewBox: "0 0 24 24",
  stem: ["M12 23 L12 13"],
  petals: [
    "M11.6 12.6 C8.4 11.6 5.6 9.6 4.6 6.4 C4.3 5.4 5 4.8 5.9 5.4 C7.8 6.6 9.8 9.4 11.5 12.2",
    "M12.4 12.6 C15.6 11.6 18.4 9.6 19.4 6.4 C19.7 5.4 19 4.8 18.1 5.4 C16.2 6.6 14.2 9.4 12.5 12.2",
    "M12 13 C10.6 10 10.6 6.5 12 3 C13.4 6.5 13.4 10 12 13 Z",
  ],
  veins: [],
  stamens: [],
  anthers: [[12, 12.6]],
  anther: 1.2,
};

type Part = "stem" | "petal" | "vein" | "stamen";

const colorClasses: Record<Part, string> = {
  stem: "text-stem",
  petal: "",
  vein: "text-lilac",
  stamen: "text-rose",
};

type LilyProps = {
  variant?: "bloom" | "mark";
  tone?: "line" | "color";
  trigger?: "load" | "scroll" | "none";
  sway?: boolean;
  className?: string;
};

export function Lily({
  variant = "bloom",
  tone = "color",
  trigger = "load",
  sway = false,
  className,
}: LilyProps) {
  const shape = variant === "bloom" ? bloom : mark;
  const colored = tone === "color";
  const paths = [
    ...shape.stem.map((d) => ({ d, part: "stem" as const })),
    ...shape.petals.map((d) => ({ d, part: "petal" as const })),
    ...shape.veins.map((d) => ({ d, part: "vein" as const })),
    ...shape.stamens.map((d) => ({ d, part: "stamen" as const })),
  ];
  const drawClassName = cn(
    trigger !== "none" && "animate-draw [stroke-dasharray:1]",
    trigger === "scroll" && "draw-on-scroll",
  );
  const fadeClassName = cn(
    trigger === "load" && "animate-fade-in [animation-delay:1.1s]",
    trigger === "scroll" && "animate-fade-in draw-on-scroll",
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
      {colored &&
        shape.petals.map((d) => (
          <path
            key={`fill-${d}`}
            d={d}
            stroke="none"
            className={cn("fill-white", fadeClassName)}
          />
        ))}
      {paths.map(({ d, part }, index) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          className={cn(
            drawClassName,
            colored ? colorClasses[part] : part === "stamen" && "text-rose",
          )}
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
          className={cn("fill-rose", fadeClassName)}
        />
      ))}
    </svg>
  );
}
