/** Une clases condicionales ignorando los valores falsos. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
