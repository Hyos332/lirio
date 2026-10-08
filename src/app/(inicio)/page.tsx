import { Benefits } from "@/components/home/benefits";
import { BestSellers } from "@/components/home/best-sellers";
import { Categories } from "@/components/home/categories";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";
import { SetupBanner } from "@/components/home/setup-banner";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <Container className="pt-2 pb-16 lg:pt-6 lg:pb-20">
      <Hero />
      <div className="mt-6 lg:mt-8">
        <Benefits />
      </div>
      <div className="mt-16 flex flex-col gap-16 lg:mt-20 lg:gap-20">
        <div className="reveal">
          <Categories />
        </div>
        <div className="reveal">
          <BestSellers />
        </div>
        <div className="reveal">
          <SetupBanner />
        </div>
        <div className="reveal">
          <Newsletter />
        </div>
      </div>
    </Container>
  );
}
