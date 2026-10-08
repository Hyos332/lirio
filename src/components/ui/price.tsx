import type { Money } from "@/lib/commerce/types";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/format";

export type PriceSize = "sm" | "md" | "lg";

const sizes: Record<PriceSize, { current: string; previous: string }> = {
  sm: { current: "text-md", previous: "text-sm" },
  md: { current: "text-base", previous: "text-sm" },
  lg: { current: "text-price", previous: "text-lg" },
};

type PriceProps = {
  price: Money;
  /** Precio anterior. Solo se muestra si es mayor que el precio actual. */
  compareAt?: Money | null;
  size?: PriceSize;
  className?: string;
};

export function Price({
  price,
  compareAt,
  size = "sm",
  className,
}: PriceProps) {
  const onSale = !!compareAt && Number(compareAt.amount) > Number(price.amount);

  return (
    <span
      className={cn(
        "inline-flex flex-wrap items-baseline gap-x-2.5 font-mono",
        className,
      )}
    >
      <span className={cn("text-ink", sizes[size].current)}>
        {onSale && <span className="sr-only">Precio de oferta: </span>}
        {formatMoney(price)}
      </span>
      {onSale && (
        <s className={cn("text-muted-2", sizes[size].previous)}>
          <span className="sr-only">Precio anterior: </span>
          {formatMoney(compareAt)}
        </s>
      )}
    </span>
  );
}
