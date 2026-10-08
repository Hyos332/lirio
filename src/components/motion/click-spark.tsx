"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/lib/cn";

type Spark = { x: number; y: number; angle: number; start: number };

type ClickSparkProps = {
  children: ReactNode;
  count?: number;
  radius?: number;
  size?: number;
  duration?: number;
  className?: string;
};

const easeOut = (t: number) => t * (2 - t);

export function ClickSpark({
  children,
  count = 8,
  radius = 22,
  size = 9,
  duration = 420,
  className,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparks = useRef<Spark[]>([]);
  const frame = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  function draw(now: number) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const scale = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    if (canvas.width !== width * scale) {
      canvas.width = width * scale;
      canvas.height = height * scale;
    }

    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, width, height);
    context.strokeStyle = getComputedStyle(canvas).color;
    context.lineWidth = 2;
    context.lineCap = "round";

    sparks.current = sparks.current.filter((spark) => {
      const progress = (now - spark.start) / duration;
      if (progress >= 1) return false;
      const eased = easeOut(progress);
      const distance = eased * radius;
      const length = size * (1 - eased);
      const cos = Math.cos(spark.angle);
      const sin = Math.sin(spark.angle);
      context.beginPath();
      context.moveTo(spark.x + distance * cos, spark.y + distance * sin);
      context.lineTo(
        spark.x + (distance + length) * cos,
        spark.y + (distance + length) * sin,
      );
      context.stroke();
      return true;
    });

    frame.current =
      sparks.current.length > 0 ? requestAnimationFrame(draw) : null;
  }

  function burst(event: PointerEvent<HTMLDivElement>) {
    const canvas = canvasRef.current;
    if (
      !canvas ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const rect = canvas.getBoundingClientRect();
    const start = performance.now();
    sparks.current.push(
      ...Array.from({ length: count }, (_, index) => ({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        angle: (2 * Math.PI * index) / count,
        start,
      })),
    );
    frame.current ??= requestAnimationFrame(draw);
  }

  return (
    <div className={cn("relative", className)} onPointerDown={burst}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute -inset-6 z-10 text-accent"
      />
      {children}
    </div>
  );
}
