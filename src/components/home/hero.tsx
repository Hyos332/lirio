import { Lily } from "@/components/brand/lily";
import { BlurText } from "@/components/motion/blur-text";
import { CircularText } from "@/components/motion/circular-text";
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

  return (
    <section className="grid items-center gap-4 rounded-block bg-surface-2 p-6 md:p-12 lg:grid-cols-2 lg:gap-12 lg:p-16">
      <div>
        <Eyebrow className="animate-fade-in">Nueva colección</Eyebrow>
        <BlurText
          as="h1"
          text="Tecnología que se ve tan bien como funciona."
          className="mt-5 max-w-xl text-display-sm lg:mt-6 lg:text-display"
        />
        <p className="mt-5 max-w-md animate-fade-in text-md text-ink-3 [animation-delay:400ms] lg:mt-6 lg:text-lg">
          Audio, carga y accesorios seleccionados por diseño y calidad. Sin
          ruido, sin relleno.
        </p>
        <div className="mt-8 flex animate-fade-in gap-3 [animation-delay:550ms]">
          <Magnet className="w-full lg:w-auto">
            <Button href={routes.collection(collections.all)} fullWidth>
              Ver productos
            </Button>
          </Magnet>
          <div className="hidden lg:block">
            <Magnet>
              <Button
                href={routes.collection(collections.deals)}
                variant="secondary"
              >
                Ofertas de la semana
              </Button>
            </Magnet>
          </div>
        </div>
      </div>
      <div className="relative mt-4 lg:mt-0">
        <Picture
          image={featured?.featuredImage ?? null}
          alt={featured?.title}
          placeholder="Foto producto estrella"
          tone="surface-3"
          withIcon
          preload
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="h-65 rounded-panel lg:h-110 [&_img]:animate-settle"
        />
        <div className="absolute -top-5 -left-3 animate-fade-in [animation-delay:700ms] lg:-top-8 lg:-left-8">
          <CircularText
            text="Lirio · Tecnología seleccionada · "
            className="size-24 lg:size-32"
          >
            <Lily
              variant="mark"
              trigger="none"
              className="size-7 text-ink lg:size-9"
            />
          </CircularText>
        </div>
      </div>
    </section>
  );
}
