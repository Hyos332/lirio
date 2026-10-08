import { cn } from "@/lib/cn";

import { Icon } from "./icon";

export type PlaceholderTone = "surface" | "surface-2" | "surface-3" | "dark-2";

const tones: Record<PlaceholderTone, string> = {
  surface: "bg-surface text-muted-2",
  "surface-2": "bg-surface-2 text-muted-2",
  "surface-3": "bg-surface-3 text-muted-2",
  "dark-2": "bg-dark-2 text-muted-3",
};

type ImagePlaceholderProps = {
  /** Texto del recuadro, por ejemplo "Foto producto". Se muestra en mayúsculas y entre corchetes. */
  label: string;
  tone?: PlaceholderTone;
  /** Muestra el ícono de imagen sobre el texto. */
  withIcon?: boolean;
  /** Alto, ancho, radio y borde se pasan por clase. */
  className?: string;
};

/** Recuadro que ocupa el lugar de una imagen cuando no hay foto (modo mock). */
export function ImagePlaceholder({
  label,
  tone = "surface-2",
  withIcon = false,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex flex-col items-center justify-center gap-3 overflow-hidden p-4 text-center",
        tones[tone],
        className,
      )}
    >
      {withIcon && (
        <Icon
          name="image"
          size={48}
          strokeWidth={1.25}
          className="text-muted-3"
        />
      )}
      <span aria-hidden className="font-mono text-xs tracking-wide uppercase">
        [{label}]
      </span>
    </div>
  );
}
