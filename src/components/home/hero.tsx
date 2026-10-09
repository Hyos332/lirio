import { Lily } from "@/components/brand/lily";
import { BlurText } from "@/components/motion/blur-text";
import { CircularText } from "@/components/motion/circular-text";
import { FloatingPetals } from "@/components/motion/floating-petals";
import { Magnet } from "@/components/motion/magnet";
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
  const image = featured?.featuredImage ?? null;

  return (
    <section className="relative grid items-center gap-8 overflow-hidden rounded-block bg-dark p-6 text-white md:p-12 lg:grid-cols-2 lg:gap-12 lg:p-16">
      <div className="pointer-events-none absolute -top-40 -left-40 size-120 animate-breathe rounded-pill bg-accent blur-3xl" />
      <FloatingPetals />
      <div className="relative">
        <Eyebrow tone="light" className="animate-fade-in">
          Nueva colección
        </Eyebrow>
        <BlurText
          as="h1"
          text="Tecnología que se ve tan bien"
          highlight="como funciona."
          className="mt-5 max-w-xl font-display text-display-sm lg:mt-6 lg:text-display"
          highlightClassName="text-lilac-2 italic"
        />
        <p className="mt-5 max-w-md animate-fade-in text-md text-dark-text [animation-delay:400ms] lg:mt-6 lg:text-lg">
          Audio, carga y accesorios seleccionados por diseño y calidad. Sin
          ruido, sin relleno.
        </p>
        <div className="mt-8 flex animate-fade-in gap-3 [animation-delay:550ms]">
          <Magnet className="w-full lg:w-auto">
            <Button
              href={routes.collection(collections.all)}
              variant="inverted"
              fullWidth
            >
              Ver productos
            </Button>
          </Magnet>
          <div className="hidden lg:block">
            <Magnet>
              <Button
                href={routes.collection(collections.deals)}
                variant="outline-inverted"
              >
                Ofertas de la semana
              </Button>
            </Magnet>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="relative isolate grid h-80 place-items-center overflow-hidden rounded-t-pill rounded-b-panel bg-dark-2 lg:h-120">
          <div className="absolute size-72 animate-breathe rounded-pill bg-accent blur-3xl lg:size-96" />
          {image ? (
            <div className="absolute inset-0">
              <Picture
                image={image}
                alt={featured?.title}
                placeholder="Foto producto estrella"
                tone="dark-2"
                preload
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="size-full [&_img]:animate-settle"
              />
            </div>
          ) : (
            <Lily sway className="relative h-64 text-lilac-2 lg:h-96" />
          )}
        </div>
        <div className="absolute -top-4 -left-2 animate-fade-in [animation-delay:700ms] lg:-top-6 lg:-left-6">
          <CircularText
            text="Lirio · Tecnología seleccionada · "
            className="size-24 lg:size-32"
          >
            <Lily
              variant="mark"
              trigger="none"
              className="size-7 text-accent lg:size-9"
            />
          </CircularText>
        </div>
      </div>
    </section>
  );
}
