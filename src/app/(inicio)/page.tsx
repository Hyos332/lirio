import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function Home() {
  return (
    <Container className="py-24">
      <Eyebrow>En construcción</Eyebrow>
      <h1 className="mt-4 text-display-sm md:text-display">
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
