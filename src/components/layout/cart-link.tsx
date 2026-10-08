import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { getCurrentCart } from "@/lib/cart";
import { pluralize } from "@/lib/format";
import { routes } from "@/lib/routes";

export function CartIcon({ count }: { count: number }) {
  return (
    <IconButton
      href={routes.cart}
      icon="bag"
      label={
        count > 0
          ? `Carrito, ${pluralize(count, "producto", "productos")}`
          : "Carrito"
      }
    >
      {count > 0 && (
        <Badge variant="count" className="absolute top-1.5 right-1">
          {count}
        </Badge>
      )}
    </IconButton>
  );
}

export async function CartLink() {
  const cart = await getCurrentCart();
  return <CartIcon count={cart?.totalQuantity ?? 0} />;
}
