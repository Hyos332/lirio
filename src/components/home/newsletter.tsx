import { store } from "@/config/store";

import { NewsletterForm } from "./newsletter-form";

export function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter"
      className="flex flex-col gap-6 border-y border-line py-10 lg:flex-row lg:items-center lg:justify-between lg:py-12"
    >
      <div>
        <h2 id="newsletter" className="text-h2-sm">
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
