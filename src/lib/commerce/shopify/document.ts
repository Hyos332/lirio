export function document(operation: string, ...fragments: string[]) {
  return [operation, ...new Set(fragments)].join("\n");
}
