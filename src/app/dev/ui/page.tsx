import type { Metadata } from "next";
import type { ReactNode } from "react";

import { FreeShipping } from "@/components/cart/free-shipping";
import { ProductGallery } from "@/components/product/product-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon, iconNames } from "@/components/ui/icon";
import { IconButton } from "@/components/ui/icon-button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Price } from "@/components/ui/price";
import { Select } from "@/components/ui/select";
import { TextLink } from "@/components/ui/text-link";
import type { Image, Money } from "@/lib/commerce/types";

export const metadata: Metadata = {
  title: "Componentes",
  robots: { index: false, follow: false },
};

const samplePrice: Money = { amount: "19.99", currencyCode: "EUR" };
const sampleCompareAt: Money = { amount: "29.99", currencyCode: "EUR" };

const galleryImages: Image[] = [1, 2, 3, 4].map((index) => ({
  url: `/dev/galeria-${index}.svg`,
  altText: `Imagen de prueba ${index}`,
  width: 1200,
  height: 1200,
}));

const colorClasses = [
  "bg-bg",
  "bg-ink",
  "bg-ink-2",
  "bg-ink-3",
  "bg-muted",
  "bg-muted-2",
  "bg-muted-3",
  "bg-line",
  "bg-line-strong",
  "bg-surface",
  "bg-surface-2",
  "bg-surface-3",
  "bg-dark",
  "bg-dark-2",
  "bg-dark-text",
  "bg-accent",
];

const typeScale = [
  ["text-display", "Tecnología que se ve bien."],
  ["text-display-sm", "Hero en celular"],
  ["text-h1", "Audio"],
  ["text-h1-product", "Audífonos inalámbricos"],
  ["text-h2-dark", "Menos cables."],
  ["text-h2", "Compra por categoría"],
  ["text-h2-sm", "Categorías"],
  ["text-lg", "Párrafo destacado del hero."],
  ["text-base", "Nombre de producto."],
  ["text-md", "Párrafo secundario y botones."],
  ["text-sm", "Navegación y textos pequeños."],
  ["text-xs", "Migas de pan y etiquetas."],
] as const;

const radiusClasses = [
  "rounded-block",
  "rounded-panel",
  "rounded-card",
  "rounded-card-sm",
  "rounded-input",
  "rounded-thumb",
  "rounded-pill",
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-8 text-h2-sm">{title}</h2>
      {children}
    </section>
  );
}

export default function UiPage() {
  return (
    <Container as="main" className="py-16">
      <Eyebrow>Lirio · /dev/ui</Eyebrow>
      <h1 className="mt-3 mb-4 text-h1-product md:text-h1">Componentes base</h1>
      <p className="mb-12 max-w-2xl text-md text-ink-2">
        Vitrina de los tokens de diseño y los componentes base.
      </p>

      <Section title="Colores">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {colorClasses.map((className) => (
            <li key={className}>
              <div
                className={`h-20 rounded-card-sm border border-line ${className}`}
              />
              <p className="mt-2 font-mono text-xs text-muted">
                {className.replace("bg-", "")}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tipografía">
        <ul className="flex flex-col gap-6">
          {typeScale.map(([className, sample]) => (
            <li
              key={className}
              className="grid gap-2 md:grid-cols-[200px_1fr] md:items-baseline"
            >
              <span className="font-mono text-xs text-muted">{className}</span>
              <span className={className}>{sample}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Botones">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Ver productos</Button>
            <Button variant="accent">Suscribirme</Button>
            <Button variant="secondary">Ofertas de la semana</Button>
            <Button variant="primary" disabled>
              Deshabilitado
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="accent" size="lg">
              Agregar al carrito
            </Button>
            <Button variant="secondary" size="lg">
              Comprar ahora
            </Button>
            <Button variant="accent" size="lg" disabled>
              Agotado
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-block bg-dark p-8">
            <Button variant="inverted">Explorar setup</Button>
            <Button href="/dev/ui" variant="inverted">
              Como enlace
              <Icon name="arrow-right" size={18} />
            </Button>
          </div>
          <div className="max-w-sm">
            <Button variant="primary" fullWidth>
              Ancho completo (celular)
            </Button>
          </div>
        </div>
      </Section>

      <Section title="Enlaces y controles">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <TextLink href="/dev/ui">Ver todo</TextLink>
            <TextLink tone="muted" className="text-sm">
              Eliminar
            </TextLink>
            <TextLink href="/dev/ui" underline={false} className="text-md">
              <Icon name="arrow-left" size={16} />
              Seguir comprando
            </TextLink>
          </div>
          <div className="flex items-center gap-2">
            <IconButton icon="search" label="Buscar" />
            <IconButton icon="user" label="Mi cuenta" />
            <IconButton icon="menu" label="Menú" />
          </div>
          <Select
            aria-label="Ordenar por"
            defaultValue="best-selling"
            className="w-60"
          >
            <option value="best-selling">Más vendidos</option>
            <option value="price-asc">Precio: menor a mayor</option>
          </Select>
          <Breadcrumbs
            items={[
              { title: "Inicio", href: "/" },
              { title: "Audio", href: "/dev/ui" },
              { title: "Audífonos" },
            ]}
          />
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Más vendido</Badge>
          <Badge>Nuevo</Badge>
          <Badge>Oferta</Badge>
          <span className="relative inline-flex size-11 items-center justify-center">
            <Icon name="bag" label="Carrito" />
            <Badge variant="count" className="absolute top-1.5 right-1">
              2
            </Badge>
          </span>
        </div>
      </Section>

      <Section title="Precios">
        <div className="flex flex-col gap-4">
          <Price price={samplePrice} />
          <Price price={samplePrice} compareAt={sampleCompareAt} />
          <Price price={samplePrice} compareAt={sampleCompareAt} size="md" />
          <Price price={samplePrice} compareAt={sampleCompareAt} size="lg" />
          <Price price={{ amount: "1299.9", currencyCode: "USD" }} size="md" />
        </div>
      </Section>

      <Section title="Íconos">
        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-10">
          {iconNames.map((name) => (
            <li
              key={name}
              className="flex flex-col items-center gap-2 rounded-card-sm border border-line bg-surface p-4"
            >
              <Icon name={name} size={24} />
              <span className="font-mono text-xs text-muted">{name}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Placeholders de imagen">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ImagePlaceholder
            label="Foto producto estrella"
            tone="surface-3"
            withIcon
            className="h-65 rounded-panel"
          />
          <ImagePlaceholder
            label="Foto categoría"
            className="h-65 rounded-card"
          />
          <ImagePlaceholder
            label="Foto producto"
            tone="surface"
            className="h-65 rounded-card border border-line"
          />
          <ImagePlaceholder
            label="Foto estilo de vida"
            tone="dark-2"
            className="h-65 rounded-panel"
          />
        </div>
      </Section>

      <Section title="Envío gratis">
        <div className="flex max-w-xl flex-col gap-4">
          <FreeShipping
            subtotal={samplePrice}
            threshold={{ amount: "50.00", currencyCode: "EUR" }}
          />
          <FreeShipping
            subtotal={{ amount: "60.00", currencyCode: "EUR" }}
            threshold={{ amount: "50.00", currencyCode: "EUR" }}
          />
        </div>
      </Section>

      <Section title="Galería de producto">
        <div className="max-w-2xl">
          <ProductGallery images={galleryImages} title="Producto de prueba" />
        </div>
      </Section>

      <Section title="Radios">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {radiusClasses.map((className) => (
            <li key={className}>
              <div
                className={`h-20 border border-line-strong bg-surface ${className}`}
              />
              <p className="mt-2 font-mono text-xs text-muted">{className}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Contenedor">
        <p className="mb-4 text-md text-ink-2">
          Máximo 1280px de contenido, con 16px de margen lateral en celular y
          32px en escritorio.
        </p>
        <div className="rounded-card-sm bg-surface-2 py-6">
          <Container>
            <div className="rounded-thumb border border-dashed border-muted-3 bg-surface py-6 text-center font-mono text-xs text-muted">
              Contenido
            </div>
          </Container>
        </div>
      </Section>
    </Container>
  );
}
