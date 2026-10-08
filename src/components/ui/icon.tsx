import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  ImageIcon,
  Menu,
  MessageSquare,
  Minus,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Trash2,
  Truck,
  User,
  X,
  type LucideProps,
} from "lucide-react";

/** Set cerrado de íconos de la tienda. Para agregar uno, impórtalo de lucide-react y súmalo aquí. */
const icons = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  bag: ShoppingBag,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  close: X,
  filter: SlidersHorizontal,
  image: ImageIcon,
  menu: Menu,
  minus: Minus,
  plus: Plus,
  returns: RefreshCw,
  search: Search,
  shield: ShieldCheck,
  star: Star,
  support: MessageSquare,
  trash: Trash2,
  truck: Truck,
  user: User,
} as const;

export type IconName = keyof typeof icons;

export const iconNames = Object.keys(icons) as IconName[];

type IconProps = Omit<LucideProps, "ref"> & {
  name: IconName;
  /** Texto para lectores de pantalla. Sin él, el ícono es decorativo. */
  label?: string;
};

export function Icon({
  name,
  label,
  size = 20,
  strokeWidth = 1.5,
  ...props
}: IconProps) {
  const Component = icons[name];
  return (
    <Component
      size={size}
      strokeWidth={strokeWidth}
      focusable="false"
      {...(label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true })}
      {...props}
    />
  );
}
