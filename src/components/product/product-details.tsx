import { Fragment } from "react";

import { Accordion } from "@/components/ui/accordion";
import { RichText } from "@/components/ui/rich-text";
import { store } from "@/config/store";
import type { Product } from "@/lib/commerce/types";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="mt-8 border-t border-line">
      <Accordion title="Características" defaultOpen>
        <RichText html={product.descriptionHtml} />
      </Accordion>
      {product.specifications.length > 0 && (
        <Accordion title="Especificaciones técnicas">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-md">
            {product.specifications.map((specification) => (
              <Fragment key={specification.label}>
                <dt className="text-muted">{specification.label}</dt>
                <dd>{specification.value}</dd>
              </Fragment>
            ))}
          </dl>
        </Accordion>
      )}
      {store.shippingAndReturns && (
        <Accordion title="Envíos y devoluciones">
          <p className="text-md text-ink-2">{store.shippingAndReturns}</p>
        </Accordion>
      )}
    </div>
  );
}
