"use client";

import { useRef, useState, ViewTransition, type ReactNode } from "react";

import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Picture } from "@/components/ui/picture";
import type { Image } from "@/lib/commerce/types";
import { morphName } from "@/lib/product";

const slideClassName = "aspect-square lg:aspect-auto lg:h-155";

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

function Morph({ handle, children }: { handle: string; children: ReactNode }) {
  return (
    <ViewTransition name={morphName(handle)} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}

type ProductGalleryProps = { handle: string; images: Image[]; title: string };

export function ProductGallery({ handle, images, title }: ProductGalleryProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <Morph handle={handle}>
        <ImagePlaceholder
          label="Foto principal"
          tone="surface-2"
          withIcon
          className={`${slideClassName} rounded-panel rounded-bl-checkbox`}
        />
      </Morph>
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
      <Morph handle={handle}>
        <ul
          ref={trackRef}
          aria-label={`Imágenes de ${title}`}
          onScroll={(event) => {
            const track = event.currentTarget;
            setActive(Math.round(track.scrollLeft / track.clientWidth));
          }}
          className="flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overscroll-x-contain rounded-panel rounded-bl-checkbox bg-surface-2 lg:overflow-hidden"
        >
          {images.map((image, index) => (
            <li key={image.url} className="w-full shrink-0 snap-center">
              <Picture
                image={image}
                alt={image.altText || `${title}, imagen ${index + 1}`}
                placeholder="Foto producto"
                tone="surface-2"
                fit="contain"
                sizes="(min-width: 1024px) 50vw, 100vw"
                preload={index === 0}
                className={slideClassName}
              />
            </li>
          ))}
        </ul>
      </Morph>

      {images.length > 1 && (
        <>
          <div
            aria-hidden
            className="mt-3 flex justify-center gap-1.5 lg:hidden"
          >
            {images.map((image, index) => (
              <span
                key={image.url}
                className={`h-1.5 rounded-pill transition-all duration-300 ${index === active ? "w-5 bg-accent" : "w-1.5 bg-line-strong"}`}
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
                  className="block w-full overflow-hidden rounded-input border border-line transition-colors hover:border-line-strong aria-[current=true]:border-2 aria-[current=true]:border-accent"
                >
                  <Picture
                    image={image}
                    alt=""
                    placeholder="Foto producto"
                    tone="surface-2"
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
