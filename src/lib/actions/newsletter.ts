"use server";

import { z } from "zod";

export type NewsletterState = {
  status: "idle" | "success" | "error";
  message: string;
  email: string;
};

const emailSchema = z.email();

export async function subscribe(
  _previous: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const submitted = String(formData.get("email") ?? "");
  const email = emailSchema.safeParse(submitted);
  if (!email.success) {
    return {
      status: "error",
      message: "Ingresa un correo válido.",
      email: submitted,
    };
  }

  // TODO: registrar la suscripción en Shopify (customerCreate con acceptsMarketing) o en Klaviyo.
  console.info("Nueva suscripción al newsletter:", email.data);

  return {
    status: "success",
    message: "Listo. Te avisaremos de las próximas ofertas.",
    email: "",
  };
}
