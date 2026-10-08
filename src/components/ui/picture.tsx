import NextImage from "next/image";

import type { Image } from "@/lib/commerce/types";
import { cn } from "@/lib/cn";

import {
  ImagePlaceholder,
  surfaceTones,
  type SurfaceTone,
} from "./image-placeholder";

type PictureProps = {
  image: Image | null;
  placeholder: string;
  sizes: string;
  alt?: string;
  tone?: SurfaceTone;
  fit?: "cover" | "contain";
  withIcon?: boolean;
  preload?: boolean;
  className?: string;
};

export function Picture({
  image,
  placeholder,
  sizes,
  alt,
  tone = "surface-2",
  fit = "cover",
  withIcon,
  preload,
  className,
}: PictureProps) {
  if (!image) {
    return (
      <ImagePlaceholder
        label={placeholder}
        tone={tone}
        withIcon={withIcon}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden", surfaceTones[tone], className)}
    >
      <NextImage
        src={image.url}
        alt={alt ?? image.altText}
        fill
        sizes={sizes}
        preload={preload}
        className={fit === "cover" ? "object-cover" : "object-contain p-[6%]"}
      />
    </div>
  );
}
