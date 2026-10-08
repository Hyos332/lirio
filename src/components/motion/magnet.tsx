"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
};

export function Magnet({
  children,
  padding = 60,
  strength = 6,
  className,
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    let frame = 0;

    function handleMove(event: globalThis.PointerEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const wrapper = wrapperRef.current;
        const inner = innerRef.current;
        if (!wrapper || !inner) return;

        const { left, top, width, height } = wrapper.getBoundingClientRect();
        const dx = event.clientX - (left + width / 2);
        const dy = event.clientY - (top + height / 2);
        const near =
          Math.abs(dx) < width / 2 + padding &&
          Math.abs(dy) < height / 2 + padding;

        inner.style.transition = near
          ? "translate 300ms ease-out"
          : "translate 500ms ease-in-out";
        inner.style.translate = near
          ? `${dx / strength}px ${dy / strength}px`
          : "0 0";
      });
    }

    window.addEventListener("pointermove", handleMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
    };
  }, [padding, strength]);

  return (
    <div ref={wrapperRef} className={cn("inline-block", className)}>
      <div ref={innerRef} className="size-full">
        {children}
      </div>
    </div>
  );
}
