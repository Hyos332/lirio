"use client";

import { Button } from "@/components/ui/button";
import { formatMoney, pluralize } from "@/lib/format";
import { routes } from "@/lib/routes";
import { getFreeShippingThreshold } from "@/lib/shipping";

import { CartLines } from "./cart-lines";
import { useCart } from "./cart-context";
import { CheckoutButton } from "./checkout-button";
import { DiscountForm } from "./discount-form";
import { EmptyCart } from "./empty-cart";
import { FreeShipping } from "./free-shipping";
import { SummaryRow } from "./summary-row";

export function CartPageView({ paymentMethods }: { paymentMethods: string[] }) {
  const { cart, setQuantity } = useCart();
  const count = cart?.totalQuantity ?? 0;

  return (
    <>
      <h1 className="text-h2-sm md:text-h1">
        Tu carrito <span className="text-muted">({count})</span>
      </h1>
      {!cart || count === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mt-8 grid items-start gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_405px]">
          <div>
            <FreeShipping
              subtotal={cart.subtotal}
              threshold={getFreeShippingThreshold(cart.subtotal.currencyCode)}
              className="mb-8"
            />
            <CartLines lines={cart.lines} onQuantityChange={setQuantity} />
          </div>
          <section
            aria-labelledby="resumen"
            className="rounded-panel border border-line bg-surface p-6 lg:p-8"
          >
            <h2 id="resumen" className="text-h2-sm">
              Resumen
            </h2>
            <dl className="mt-6 flex flex-col gap-3">
              <SummaryRow label="Subtotal">
                <span className="font-mono">{formatMoney(cart.subtotal)}</span>
              </SummaryRow>
              {cart.discount && (
                <SummaryRow label="Descuento">
                  <span className="font-mono">
                    −{formatMoney(cart.discount)}
                  </span>
                </SummaryRow>
              )}
              <SummaryRow label="Envío">Se calcula en el pago</SummaryRow>
            </dl>
            <div className="mt-5">
              <DiscountForm codes={cart.discountCodes} />
            </div>
            <dl className="mt-5 border-t border-line pt-5">
              <SummaryRow label="Total" emphasis>
                <span className="font-mono">{formatMoney(cart.total)}</span>
              </SummaryRow>
            </dl>
            <div className="mt-6">
              <CheckoutButton checkoutUrl={cart.checkoutUrl} />
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              El pago se completa en el checkout seguro de Shopify.
            </p>
            {paymentMethods.length > 0 && (
              <ul
                aria-label="Métodos de pago"
                className="mt-4 flex flex-wrap justify-center gap-2"
              >
                {paymentMethods.map((method) => (
                  <li
                    key={method}
                    className="rounded-thumb border border-line px-3 py-1 text-xs text-ink-2"
                  >
                    {method}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </>
  );
}

export function CartDrawerView({ onNavigate }: { onNavigate: () => void }) {
  const { cart, setQuantity } = useCart();
  if (!cart || cart.totalQuantity === 0)
    return <EmptyCart onNavigate={onNavigate} />;

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 p-4">
        <p className="text-md text-muted">
          {pluralize(cart.totalQuantity, "producto", "productos")}
        </p>
        <FreeShipping
          subtotal={cart.subtotal}
          threshold={getFreeShippingThreshold(cart.subtotal.currencyCode)}
          className="mt-4"
        />
        <div className="mt-6">
          <CartLines
            lines={cart.lines}
            onQuantityChange={setQuantity}
            onNavigate={onNavigate}
            compact
          />
        </div>
      </div>
      <div className="sticky bottom-0 border-t border-line bg-bg p-4">
        <dl className="flex flex-col gap-2">
          {cart.discount && (
            <SummaryRow label="Descuento">
              <span className="font-mono">−{formatMoney(cart.discount)}</span>
            </SummaryRow>
          )}
          <SummaryRow label="Subtotal" emphasis>
            <span className="font-mono">{formatMoney(cart.total)}</span>
          </SummaryRow>
        </dl>
        <p className="mt-1 text-xs text-muted">
          El envío se calcula en el pago.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <CheckoutButton checkoutUrl={cart.checkoutUrl} />
          <Button
            href={routes.cart}
            variant="secondary"
            fullWidth
            onClick={onNavigate}
          >
            Ver carrito
          </Button>
        </div>
      </div>
    </div>
  );
}
