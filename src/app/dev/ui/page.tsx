import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon, iconNames } from "@/components/ui/icon";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Price } from "@/components/ui/price";
import type { Money } from "@/lib/commerce/types";

export const metadata: Metadata = {
  title: "Componentes",
  robots: { index: false, follow: false },
};

// Valores de ejemplo solo para esta vitrina.
const samplePrice: Money = { amount: "19.99", currencyCode: "EUR" };
const sampleCompareAt: Money = { amount: "29.99", currencyCode: "EUR" };

const colors = [
  { token: "bg", hex: "#F7F7F5", className: "bg-bg" },
  { token: "ink", hex: "#111214", className: "bg-ink" },
  { token: "ink-2", hex: "#3B3D42", className: "bg-ink-2" },
  { token: "ink-3", hex: "#4A4D53", className: "bg-ink-3" },
  { token: "muted", hex: "#5C5F66", className: "bg-muted" },
  { token: "muted-2", hex: "#6B6E74", className: "bg-muted-2" },
  { token: "muted-3", hex: "#8A8D93", className: "bg-muted-3" },
  { token: "line", hex: "#E2E2DE", className: "bg-line" },
  { token: "line-strong", hex: "#C9CAC5", className: "bg-line-strong" },
  { token: "surface", hex: "#FFFFFF", className: "bg-surface" },
  { token: "surface-2", hex: "#ECECE8", className: "bg-surface-2" },
  { token: "surface-3", hex: "#DCDCD6", className: "bg-surface-3" },
  { token: "dark", hex: "#111214", className: "bg-dark" },
  { token: "dark-2", hex: "#26282C", className: "bg-dark-2" },
  { token: "dark-text", hex: "#C4C6CB", className: "bg-dark-text" },
  { token: "accent", hex: "#2343D6 (--accent)", className: "bg-accent" },
];

const typeScale = [
  {
    name: "display · 64px",
    className: "text-display",
    sample: "Tecnología que se ve bien.",
  },
  {
    name: "display-sm · 36px",
    className: "text-display-sm",
    sample: "Hero en celular",
  },
  { name: "h1 · 48px", className: "text-h1", sample: "Audio" },
  {
    name: "h1-product · 40px",
    className: "text-h1-product",
    sample: "Audífonos inalámbricos",
  },
  {
    name: "h2-dark · 44px",
    className: "text-h2-dark",
    sample: "Menos cables.",
  },
  { name: "h2 · 36px", className: "text-h2", sample: "Compra por categoría" },
  { name: "h2-sm · 28px", className: "text-h2-sm", sample: "Categorías" },
  {
    name: "lg · 18px",
    className: "text-lg",
    sample: "Párrafo destacado del hero.",
  },
  {
    name: "base · 16px",
    className: "text-base",
    sample: "Nombre de producto.",
  },
  {
    name: "md · 15px",
    className: "text-md",
    sample: "Párrafo secundario y botones.",
  },
  {
    name: "sm · 14px",
    className: "text-sm",
    sample: "Navegación y textos pequeños.",
  },
  {
    name: "xs · 13px",
    className: "text-xs",
    sample: "Migas de pan y etiquetas.",
  },
  {
    name: "mono · 13px",
    className: "font-mono text-xs tracking-wide text-accent",
    sample: "NUEVA COLECCIÓN",
  },
];

const radii = [
  { name: "block · 28px", className: "rounded-block" },
  { name: "panel · 24px", className: "rounded-panel" },
  { name: "card · 20px", className: "rounded-card" },
  { name: "card-sm · 16px", className: "rounded-card-sm" },
  { name: "input · 14px", className: "rounded-input" },
  { name: "thumb · 12px", className: "rounded-thumb" },
  { name: "pill · 999px", className: "rounded-pill" },
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
      <p className="font-mono text-xs tracking-wide text-muted uppercase">
        Lirio · /dev/ui
      </p>
      <h1 className="mt-3 mb-4 text-h1-product md:text-h1">Componentes base</h1>
      <p className="mb-12 max-w-2xl text-md text-ink-2">
        Vitrina de los tokens de diseño y los componentes de la Fase 1. Sirve
        para revisar el estilo antes de construir las páginas.
      </p>

      <Section title="Colores">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {colors.map((color) => (
            <li key={color.token}>
              <div
                className={`h-20 rounded-card-sm border border-line ${color.className}`}
              />
              <p className="mt-2 text-sm font-medium">{color.token}</p>
              <p className="font-mono text-xs text-muted">{color.hex}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tipografía">
        <ul className="flex flex-col gap-6">
          {typeScale.map((item) => (
            <li
              key={item.name}
              className="grid gap-2 md:grid-cols-[200px_1fr] md:items-baseline"
            >
              <span className="font-mono text-xs text-muted">{item.name}</span>
              <span className={item.className}>{item.sample}</span>
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

      <Section title="Radios">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {radii.map((radius) => (
            <li key={radius.name}>
              <div
                className={`h-20 border border-line-strong bg-surface ${radius.className}`}
              />
              <p className="mt-2 font-mono text-xs text-muted">{radius.name}</p>
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
