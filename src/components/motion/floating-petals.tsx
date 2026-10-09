import { cn } from "@/lib/cn";

const petals = [
  { position: "top-[12%] left-[46%]", size: "size-5", delay: "0s" },
  { position: "top-[68%] left-[6%]", size: "size-4", delay: "-4s" },
  { position: "top-[22%] left-[88%]", size: "size-6", delay: "-8s" },
  { position: "top-[82%] left-[54%]", size: "size-3", delay: "-2s" },
  { position: "top-[44%] left-[30%]", size: "size-3", delay: "-11s" },
];

export function FloatingPetals({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {petals.map(({ position, size, delay }) => (
        <svg
          key={position}
          viewBox="0 0 24 24"
          className={cn(
            "absolute animate-float fill-lilac/40 motion-reduce:hidden",
            position,
            size,
          )}
          style={{ animationDelay: delay }}
        >
          <path d="M12 2 C17 7 17 15 12 22 C7 15 7 7 12 2 Z" />
        </svg>
      ))}
    </div>
  );
}
