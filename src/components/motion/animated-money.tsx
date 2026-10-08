"use client";

import { useLayoutEffect, useRef } from "react";

import type { Money } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";

const DURATION = 450;
const easeOut = (t: number) => 1 - (1 - t) ** 3;

export function AnimatedMoney({
  money,
  className,
}: {
  money: Money;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(Number(money.amount));

  useLayoutEffect(() => {
    const element = ref.current;
    const from = previous.current;
    const to = Number(money.amount);
    previous.current = to;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!element || from === to || reducedMotion) return;

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION);
      const amount = from + (to - from) * easeOut(progress);
      element.textContent = formatMoney({
        ...money,
        amount: amount.toFixed(2),
      });
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    element.textContent = formatMoney({ ...money, amount: from.toFixed(2) });
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [money]);

  return (
    <span ref={ref} className={className}>
      {formatMoney(money)}
    </span>
  );
}
