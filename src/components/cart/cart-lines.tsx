"use client";

import Link from "next/link";

import { Picture } from "@/components/ui/picture";
import { Price } from "@/components/ui/price";
import { QuantityControl } from "@/components/ui/quantity-control";
import { TextLink } from "@/components/ui/text-link";
import type { CartLine } from "@/lib/commerce/types";
import { cn } from "@/lib/cn";
import { describeOptions } from "@/lib/product";
import { routes } from "@/lib/routes";

type CartLinesProps = {
  lines: CartLine[];
  onQuantityChange: (lineId: string, quantity: number) => void;
  onNavigate?: () => void;
  compact?: boolean;
};

export function CartLines({
  lines,
  onQuantityChange,
  onNavigate,
  compact = false,
}: CartLinesProps) {
  return (
    <ul aria-label="Productos en el carrito" className="divide-y divide-line">
      {lines.map((line) => {
        const href = routes.product(line.merchandise.product.handle);
        const options = describeOptions(line.merchandise.selectedOptions);

        return (
          <li
            key={line.id}
            className={cn(
              "grid items-center gap-x-4 py-5 first:pt-0",
              compact
                ? "grid-cols-[80px_1fr]"
                : "grid-cols-[96px_1fr] sm:grid-cols-[140px_minmax(0,1fr)_auto_7.5rem] sm:gap-x-8 sm:py-6",
            )}
          >
            <Link
              href={href}
              onClick={onNavigate}
              tabIndex={-1}
              aria-hidden
              className="row-span-2 sm:row-span-1"
            >
              <Picture
                image={line.merchandise.image}
                alt=""
                placeholder="Foto"
                tone="surface"
                fit="contain"
                sizes="140px"
                className={cn(
                  "rounded-card-sm border border-line",
                  compact ? "size-20" : "size-24 sm:size-35",
                )}
              />
            </Link>
            <div className="min-w-0">
              <Link
                href={href}
                onClick={onNavigate}
                className={cn(
                  "font-medium hover:underline",
                  compact ? "text-md" : "text-base sm:text-lg",
                )}
              >
                {line.merchandise.product.title}
              </Link>
              {options && <p className="mt-1 text-sm text-muted">{options}</p>}
              <TextLink
                tone="muted"
                className="text-sm"
                onClick={() => onQuantityChange(line.id, 0)}
              >
                Eliminar
              </TextLink>
            </div>
            <div
              className={cn(
                "col-start-2 flex items-center justify-between gap-4",
                !compact && "sm:col-start-auto sm:contents",
              )}
            >
              <QuantityControl
                size="sm"
                value={line.quantity}
                onChange={(quantity) => onQuantityChange(line.id, quantity)}
                label={`Cantidad de ${line.merchandise.product.title}`}
              />
              <Price
                price={line.cost}
                size="md"
                className={cn(!compact && "sm:justify-self-end")}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
