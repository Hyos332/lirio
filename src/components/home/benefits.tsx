import { Icon, type IconName } from "@/components/ui/icon";
import { policies } from "@/lib/policies";

type Benefit = { icon: IconName; title: string; detail: string | null };

const benefits: Benefit[] = [
  {
    icon: "truck",
    title: "Envío rápido",
    detail: policies.shippingDays && `${policies.shippingDays} hábiles`,
  },
  { icon: "shield", title: "Pago seguro", detail: "Tarjeta, PayPal y más" },
  {
    icon: "returns",
    title: "Devolución fácil",
    detail:
      policies.returnDays && `${policies.returnDays} para cambiar de idea`,
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
      {benefits.map((benefit, index) => (
        <li
          key={benefit.title}
          className="group flex animate-rise flex-col gap-3 rounded-card-sm border border-line bg-surface p-4 transition duration-300 hover:-translate-y-1 hover:border-lilac hover:shadow-lift sm:flex-row sm:items-center sm:gap-4 lg:px-5 lg:py-4"
          style={{ animationDelay: `${600 + index * 90}ms` }}
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-pill bg-surface-2 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
            <Icon name={benefit.icon} size={20} />
          </span>
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
