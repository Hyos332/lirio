import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { RichText } from "@/components/ui/rich-text";
import { contentPageHandles } from "@/config/navigation";
import { getPage } from "@/lib/commerce";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return contentPageHandles.map((handle) => ({ handle }));
}

export async function generateMetadata({
  params,
}: PageProps<"/paginas/[handle]">): Promise<Metadata> {
  const page = await getPage((await params).handle);
  if (!page) return {};
  return {
    title: page.seo.title || page.title,
    description: page.seo.description,
  };
}

export default async function ContentPage({
  params,
}: PageProps<"/paginas/[handle]">) {
  const page = await getPage((await params).handle);
  if (!page) notFound();

  return (
    <Container className="py-10 lg:py-16">
      <Breadcrumbs
        items={[{ title: "Inicio", href: routes.home }, { title: page.title }]}
      />
      <h1 className="mt-6 text-h2-sm md:text-h1">{page.title}</h1>
      <RichText html={page.body} className="mt-8 max-w-3xl" />
    </Container>
  );
}
