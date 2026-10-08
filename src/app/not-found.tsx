import { StoreShell } from "@/components/layout/store-shell";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { collections } from "@/config/collections";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <StoreShell>
      <Container className="py-24 lg:py-32">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-4 max-w-2xl text-h2-sm md:text-h1">
          No encontramos esta página
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ink-3">
          Puede que el enlace esté roto o que la página ya no exista.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={routes.home}>Volver al inicio</Button>
          <Button href={routes.collection(collections.all)} variant="secondary">
            Ver productos
          </Button>
        </div>
      </Container>
    </StoreShell>
  );
}
