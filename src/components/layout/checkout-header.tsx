import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { TextLink } from "@/components/ui/text-link";
import { routes } from "@/lib/routes";

import { Logo } from "./logo";

export function CheckoutHeader() {
  return (
    <header>
      <Container className="flex h-16 items-center justify-between border-b border-line lg:h-19">
        <Logo />
        <TextLink href={routes.home} underline={false} className="text-md">
          <Icon name="arrow-left" size={16} />
          Seguir comprando
        </TextLink>
      </Container>
    </header>
  );
}
