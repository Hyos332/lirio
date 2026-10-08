import { Icon, type IconName } from "@/components/ui/icon";
import { store } from "@/config/store";

type Benefit = { icon: IconName; title: string; detail: string | null };

const benefits: Benefit[] = [
  {
    icon: "truck",
    title: "Envío rápido",
    detail: store.shippingDays
      ? `${store.shippingDays.min}–${store.shippingDays.max} días hábiles`
      : null,
  },
  { icon: "shield", title: "Pago seguro", detail: "Tarjeta, PayPal y más" },
  {
    icon: "returns",
    title: "Devolución fácil",
    detail: store.returnDays
      ? `${store.returnDays} días para cambiar de idea`
      : null,
  },
  {
    icon: "support",
    title: "Soporte real",
    detail: "Te respondemos por WhatsApp",
  },
];

export function Benefits() {
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
      {benefits.map((benefit) => (
        <li
          key={benefit.title}
          className="flex flex-col gap-3 rounded-card-sm border border-line bg-surface p-4 sm:flex-row sm:items-center sm:gap-4 lg:px-6 lg:py-4"
        >
          <Icon name={benefit.icon} size={22} className="shrink-0" />
          <div>
            <p className="text-md font-medium">{benefit.title}</p>
            {benefit.detail && (
              <p className="mt-0.5 text-xs text-muted">{benefit.detail}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
