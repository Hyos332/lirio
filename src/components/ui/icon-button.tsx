import { cn } from "@/lib/cn";

import { Action, type ActionProps } from "./action";
import { Icon, type IconName } from "./icon";

type IconButtonProps = ActionProps & { icon: IconName; label: string };

export function IconButton({
  icon,
  label,
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <Action
      aria-label={label}
      className={cn(
        "relative inline-flex size-11 shrink-0 items-center justify-center rounded-pill text-ink transition-colors hover:bg-ink/5",
        className,
      )}
      {...(props as ActionProps)}
    >
      <Icon name={icon} size={22} />
      {children}
    </Action>
  );
}
