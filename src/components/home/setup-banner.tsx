import { Button } from "@/components/ui/button";
import { Picture } from "@/components/ui/picture";
import { collections } from "@/config/collections";
import { getCollection } from "@/lib/commerce";
import { routes } from "@/lib/routes";

export async function SetupBanner() {
  const collection = await getCollection(collections.setup);

  return (
    <section className="grid items-center gap-12 rounded-block bg-dark p-6 text-white md:grid-cols-2 md:p-12 lg:p-16">
      <div className="hidden md:block">
        <Picture
          image={collection?.image ?? null}
          alt=""
          placeholder="Foto estilo de vida"
          tone="dark-2"
          sizes="(min-width: 768px) 40vw, 0px"
          className="h-85 rounded-panel"
        />
      </div>
      <div>
        <h2 className="text-h2-sm md:text-h2-dark">
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
