import { Lily } from "@/components/brand/lily";
import { Button } from "@/components/ui/button";
import { collections } from "@/config/collections";
import { routes } from "@/lib/routes";

export function EmptyCart({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <Lily className="mb-6 h-32 text-ink" />
      <p className="text-lg font-medium">Tu carrito está vacío</p>
      <p className="mt-2 max-w-xs text-md text-muted">
        Explora el catálogo y agrega lo que te guste.
      </p>
      <Button
        href={routes.collection(collections.all)}
        onClick={onNavigate}
        className="mt-8"
      >
        Ver productos
      </Button>
    </div>
  );
}
