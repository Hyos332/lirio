import type { Money } from "@/lib/commerce/types";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/format";
import { fromCents, toCents } from "@/lib/money";

type FreeShippingProps = {
  subtotal: Money;
  threshold: Money | null;
  className?: string;
};

export function FreeShipping({
  subtotal,
  threshold,
  className,
}: FreeShippingProps) {
  if (!threshold) return null;

  const missing = toCents(threshold) - toCents(subtotal);
  const progress = Math.min(
    100,
    (toCents(subtotal) / toCents(threshold)) * 100,
  );

  return (
    <div
      className={cn(
        "rounded-card-sm border border-line bg-surface px-5 py-4",
        className,
      )}
    >
      <p className="text-sm">
        {missing > 0 ? (
          <>
            Te faltan{" "}
            <strong className="font-medium">
              {formatMoney(fromCents(missing, subtotal.currencyCode))}
            </strong>{" "}
            para el envío gratis
          </>
        ) : (
          "¡Tienes envío gratis!"
        )}
      </p>
      <div
        role="progressbar"
        aria-label="Progreso hacia el envío gratis"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="mt-3 h-1.5 overflow-hidden rounded-pill bg-surface-2"
      >
        <div
          className="h-full rounded-pill bg-accent transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
