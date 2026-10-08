"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { routes } from "@/lib/routes";

type ErrorViewProps = { error: Error & { digest?: string }; retry: () => void };

export function ErrorView({ error, retry }: ErrorViewProps) {
  return (
    <Container className="py-24 lg:py-32">
      <Eyebrow>Algo salió mal</Eyebrow>
      <h1 className="mt-4 max-w-2xl text-h2-sm md:text-h1">
        No pudimos cargar esta página
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink-3">
        Puede ser un problema temporal. Inténtalo de nuevo en unos segundos.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-muted">
          Código de referencia: {error.digest}
        </p>
      )}
      <div className="mt-10 flex flex-wrap gap-3">
        <Button onClick={() => retry()}>Reintentar</Button>
        <Button href={routes.home} variant="secondary">
          Volver al inicio
        </Button>
      </div>
    </Container>
  );
}
