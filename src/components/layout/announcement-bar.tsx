import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { store } from "@/config/store";
import type { Money } from "@/lib/commerce/types";
import { getCountry } from "@/lib/country";
import { formatMoney } from "@/lib/format";
import { getFreeShippingThreshold } from "@/lib/shipping";

const enabled =
  Object.keys(store.freeShippingThresholds).length > 0 ||
  store.returnDays !== null;

function Messages({ threshold }: { threshold: Money | null }) {
  const messages = [
    threshold && `Envío gratis desde ${formatMoney(threshold)}`,
    store.returnDays && `Devoluciones en ${store.returnDays} días`,
  ].filter(Boolean);

  return messages.map((message, index) => (
    <span key={index} className={index > 0 ? "hidden sm:inline" : undefined}>
      {index > 0 && "· "}
      {message}
    </span>
  ));
}

async function LocalizedMessages() {
  const { currencyCode } = await getCountry();
  return <Messages threshold={getFreeShippingThreshold(currencyCode)} />;
}

export function AnnouncementBar() {
  if (!enabled) return null;

  return (
    <div className="bg-ink text-white">
      <Container className="flex h-9 items-center justify-center gap-1.5 text-xs">
        <Suspense fallback={<Messages threshold={null} />}>
          <LocalizedMessages />
        </Suspense>
      </Container>
    </div>
  );
}
