"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function CheckoutButton({
  checkoutUrl,
}: {
  checkoutUrl: string | null;
}) {
  const [notice, setNotice] = useState(false);

  return (
    <div>
      {checkoutUrl ? (
        <Button href={checkoutUrl} variant="accent" size="lg" fullWidth>
          Ir a pagar
        </Button>
      ) : (
        <Button
          variant="accent"
          size="lg"
          fullWidth
          onClick={() => setNotice(true)}
        >
          Ir a pagar
        </Button>
      )}
      <p
        role="status"
        className="mt-2 text-center text-sm font-medium empty:mt-0"
      >
        {notice && "Conecta Shopify para habilitar el pago."}
      </p>
    </div>
  );
}
