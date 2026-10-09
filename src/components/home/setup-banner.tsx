import { Lily } from "@/components/brand/lily";
import { Button } from "@/components/ui/button";
import { Picture } from "@/components/ui/picture";
import { collections } from "@/config/collections";
import { getCollection } from "@/lib/commerce";
import { routes } from "@/lib/routes";

export async function SetupBanner() {
  const collection = await getCollection(collections.setup);

  return (
    <section className="relative grid items-center gap-12 overflow-hidden rounded-block bg-dark p-6 text-white md:grid-cols-2 md:p-12 lg:p-16">
      <div className="pointer-events-none absolute -right-24 -bottom-32 size-96 animate-breathe rounded-pill bg-accent blur-3xl" />
      <Lily
        tone="line"
        trigger="scroll"
        sway
        className="pointer-events-none absolute -right-2 -bottom-24 hidden h-72 text-dark-text/40 md:block"
      />
      <div className="hidden md:block">
        <Picture
          image={collection?.image ?? null}
          alt=""
          placeholder="Foto estilo de vida"
          tone="dark-2"
          sizes="(min-width: 768px) 40vw, 0px"
          className="h-85 rounded-t-pill rounded-b-panel"
        />
      </div>
      <div className="relative">
        <h2 className="font-display text-h2-sm md:text-h2-dark">
          Menos cables. Más orden en tu escritorio.
        </h2>
        <p className="mt-4 max-w-md text-md text-dark-text md:mt-5 md:text-lg">
          Arma tu setup con cargadores, bases y organizadores pensados para
          verse bien juntos.
        </p>
        <Button
          href={routes.collection(collections.setup)}
          variant="inverted"
          className="mt-8 w-full md:w-auto"
        >
          Explorar setup
        </Button>
      </div>
    </section>
  );
}
