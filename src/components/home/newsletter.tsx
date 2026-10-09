import { Lily } from "@/components/brand/lily";
import { store } from "@/config/store";

import { NewsletterForm } from "./newsletter-form";

export function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter"
      className="relative flex flex-col gap-6 overflow-hidden rounded-block bg-surface-2 p-6 md:p-12 lg:flex-row lg:items-center lg:justify-between"
    >
      <Lily
        tone="line"
        trigger="scroll"
        sway
        className="pointer-events-none absolute -bottom-16 left-1/2 hidden h-64 text-line-strong lg:block"
      />
      <div className="relative">
        <h2 id="newsletter" className="font-display text-h2-sm">
          Entérate primero de las ofertas
        </h2>
        {store.newsletterBenefit && (
          <p className="mt-2 text-md text-muted">
            {store.newsletterBenefit} en tu primera compra al suscribirte.
          </p>
        )}
      </div>
      <NewsletterForm />
    </section>
  );
}
