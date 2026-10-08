import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <Container as="main" className="flex flex-1 flex-col justify-center py-24">
      <p className="font-mono text-xs tracking-wide text-accent uppercase">
        En construcción
      </p>
      <h1 className="mt-4 max-w-3xl text-display-sm md:text-display">
        lirio<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg text-ink-3">
        Tecnología seleccionada con buen gusto.
      </p>
      <div className="mt-10">
        <Button href="/dev/ui">Ver componentes</Button>
      </div>
    </Container>
  );
}
