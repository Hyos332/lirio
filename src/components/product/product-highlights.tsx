import { policies } from "@/lib/policies";

const highlights = [
  { title: "Envío", value: policies.shippingDays },
  { title: "Devolución", value: policies.returnDays },
  { title: "Garantía", value: policies.warrantyMonths },
].filter((highlight) => highlight.value);

export function ProductHighlights() {
  if (highlights.length === 0) return null;

  return (
    <ul className="mt-8 grid grid-cols-3 gap-2">
      {highlights.map((highlight) => (
        <li
          key={highlight.title}
          className="rounded-input bg-surface-2 px-4 py-3"
        >
          <p className="text-sm font-medium">{highlight.title}</p>
          <p className="mt-0.5 text-xs text-muted">{highlight.value}</p>
        </li>
      ))}
    </ul>
  );
}
