import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Picture } from "@/components/ui/picture";
import { collections } from "@/config/collections";
import { getCollectionProducts } from "@/lib/commerce";
import { defaultCountry } from "@/lib/country";
import { routes } from "@/lib/routes";

export async function Hero() {
  const { products } = await getCollectionProducts({
    handle: collections.bestSellers,
    country: defaultCountry,
    sort: "best-selling",
    first: 1,
  });
  const featured = products[0];

  return (
    <section className="grid items-center gap-4 rounded-block bg-surface-2 p-6 md:p-12 lg:grid-cols-2 lg:gap-12 lg:p-16">
      <div>
        <Eyebrow>Nueva colección</Eyebrow>
        <h1 className="mt-5 max-w-xl text-display-sm lg:mt-6 lg:text-display">
          Tecnología que se ve tan bien como funciona.
        </h1>
        <p className="mt-5 max-w-md text-md text-ink-3 lg:mt-6 lg:text-lg">
          Audio, carga y accesorios seleccionados por diseño y calidad. Sin
          ruido, sin relleno.
        </p>
        <div className="mt-8 flex gap-3">
          <Button
            href={routes.collection(collections.all)}
            className="w-full lg:w-auto"
          >
            Ver productos
          </Button>
          <div className="hidden lg:block">
            <Button
              href={routes.collection(collections.deals)}
              variant="secondary"
            >
              Ofertas de la semana
            </Button>
          </div>
        </div>
      </div>
      <Picture
        image={featured?.featuredImage ?? null}
        alt={featured?.title}
        placeholder="Foto producto estrella"
        tone="surface-3"
        withIcon
        preload
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="mt-4 h-65 rounded-panel lg:mt-0 lg:h-110"
      />
    </section>
  );
}
