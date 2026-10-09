import { Lily } from "@/components/brand/lily";
import { StoreShell } from "@/components/layout/store-shell";
import { BlurText } from "@/components/motion/blur-text";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { collections } from "@/config/collections";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <StoreShell>
      <Container className="grid items-center gap-10 py-24 lg:grid-cols-[1fr_auto] lg:py-32">
        <div>
          <Eyebrow>Error 404</Eyebrow>
          <BlurText
            as="h1"
            text="No encontramos esta página"
            className="mt-4 max-w-2xl font-display text-h2-sm md:text-h1"
          />
          <p className="mt-4 max-w-xl text-lg text-ink-3">
            Puede que el enlace esté roto o que la página ya no exista.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={routes.home}>Volver al inicio</Button>
            <Button
              href={routes.collection(collections.all)}
              variant="secondary"
            >
              Ver productos
            </Button>
          </div>
        </div>
        <Lily sway className="hidden h-96 text-accent lg:block" />
      </Container>
    </StoreShell>
  );
}
