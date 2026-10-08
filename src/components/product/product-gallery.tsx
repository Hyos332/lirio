"use client";

import { useRef, useState } from "react";

import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Picture } from "@/components/ui/picture";
import type { Image } from "@/lib/commerce/types";

const slideClassName = "aspect-square lg:aspect-auto lg:h-155";

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export function ProductGallery({
  images,
  title,
}: {
  images: Image[];
  title: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <ImagePlaceholder
        label="Foto principal"
        tone="surface"
        withIcon
        className={`${slideClassName} rounded-panel border border-line`}
      />
    );
  }

  function show(index: number) {
    const track = trackRef.current;
    if (!track) return;
    setActive(index);
    track.scrollTo({
      left: index * track.clientWidth,
      behavior: scrollBehavior(),
    });
  }

  return (
    <div>
      <ul
        ref={trackRef}
        aria-label={`Imágenes de ${title}`}
        onScroll={(event) => {
          const track = event.currentTarget;
          setActive(Math.round(track.scrollLeft / track.clientWidth));
        }}
        className="flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overscroll-x-contain rounded-panel border border-line bg-surface lg:overflow-hidden"
      >
        {images.map((image, index) => (
          <li key={image.url} className="w-full shrink-0 snap-center">
            <Picture
              image={image}
              alt={image.altText || `${title}, imagen ${index + 1}`}
              placeholder="Foto producto"
              tone="surface"
              fit="contain"
              sizes="(min-width: 1024px) 50vw, 100vw"
              preload={index === 0}
              className={slideClassName}
            />
          </li>
        ))}
      </ul>

      {images.length > 1 && (
        <>
          <div
            aria-hidden
            className="mt-3 flex justify-center gap-1.5 lg:hidden"
          >
            {images.map((image, index) => (
              <span
                key={image.url}
                className={`size-1.5 rounded-pill ${index === active ? "bg-ink" : "bg-line-strong"}`}
              />
            ))}
          </div>
          <ul className="mt-3 hidden grid-cols-4 gap-3 lg:grid">
            {images.map((image, index) => (
              <li key={image.url}>
                <button
                  type="button"
                  aria-label={`Ver imagen ${index + 1} de ${images.length}`}
                  aria-current={index === active}
                  onClick={() => show(index)}
                  className="block w-full overflow-hidden rounded-input border border-line transition-colors hover:border-line-strong aria-[current=true]:border-2 aria-[current=true]:border-ink"
                >
                  <Picture
                    image={image}
                    alt=""
                    placeholder="Foto producto"
                    tone="surface"
                    fit="contain"
                    sizes="160px"
                    className="h-30"
                  />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
