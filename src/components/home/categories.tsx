import { CategoryCard } from "@/components/collection/category-card";
import { CategoryChips } from "@/components/collection/category-chips";
import { SectionHeading } from "@/components/ui/section-heading";
import { collections } from "@/config/collections";
import { getCategories } from "@/lib/categories";
import { routes } from "@/lib/routes";

export async function Categories() {
  const categories = await getCategories();

  return (
    <section aria-labelledby="categorias">
      <SectionHeading
        id="categorias"
        title={
          <>
            <span className="md:hidden">Categorías</span>
            <span className="hidden md:inline">Compra por categoría</span>
          </>
        }
        action={{ href: routes.collection(collections.all), label: "Ver todo" }}
      />
      <CategoryChips categories={categories} className="mt-5 md:hidden" />
      <ul className="mt-8 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.handle}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}
