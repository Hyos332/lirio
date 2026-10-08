import { routes } from "@/lib/routes";

type ContentPage = { handle: string; title: string };

const helpPages: ContentPage[] = [
  { handle: "envios", title: "Envíos" },
  { handle: "devoluciones", title: "Devoluciones" },
  { handle: "preguntas-frecuentes", title: "Preguntas frecuentes" },
  { handle: "contacto", title: "Contacto" },
];

const legalPages: ContentPage[] = [
  { handle: "terminos", title: "Términos y condiciones" },
  { handle: "privacidad", title: "Privacidad" },
  { handle: "aviso-legal", title: "Aviso legal" },
];

const toLink = ({ handle, title }: ContentPage) => ({
  title,
  path: routes.page(handle),
});

export const contentPageHandles = [...helpPages, ...legalPages].map(
  (page) => page.handle,
);

export const footerNavigation = [
  {
    title: "Tienda",
    links: [
      { title: "Audio", path: routes.collection("audio") },
      { title: "Carga", path: routes.collection("carga") },
      { title: "Accesorios", path: routes.collection("accesorios") },
    ],
  },
  { title: "Ayuda", links: helpPages.map(toLink) },
  { title: "Legal", links: legalPages.map(toLink) },
];
