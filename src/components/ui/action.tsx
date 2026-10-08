import Link from "next/link";
import type { ComponentProps } from "react";

export type ActionProps =
  | (ComponentProps<"button"> & { href?: undefined })
  | ComponentProps<typeof Link>;

export function Action(props: ActionProps) {
  if (props.href !== undefined) {
    return <Link {...props} />;
  }
  const { type = "button", ...rest } = props;
  return <button type={type} {...rest} />;
}
