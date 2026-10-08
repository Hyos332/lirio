const badgeByTag = [
  ["oferta", "Oferta"],
  ["nuevo", "Nuevo"],
  ["mas-vendido", "Más vendido"],
] as const;

export function getProductBadge(tags: string[]) {
  return badgeByTag.find(([tag]) => tags.includes(tag))?.[1] ?? null;
}
