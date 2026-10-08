const PLACEHOLDER_HANDLE = "sin-contenido";

export function handleParams(handles: string[]) {
  return (handles.length > 0 ? handles : [PLACEHOLDER_HANDLE]).map(
    (handle) => ({ handle }),
  );
}
