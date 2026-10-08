"use client";

import { useActionState, useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribe, type NewsletterState } from "@/lib/actions/newsletter";
import { cn } from "@/lib/cn";

const initialState: NewsletterState = {
  status: "idle",
  message: "",
  email: "",
};

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, initialState);
  const inputId = useId();
  const messageId = useId();

  return (
    <form action={action} noValidate className="w-full lg:max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Correo electrónico
        </label>
        <Input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          defaultValue={state.email}
          placeholder="tu@correo.com"
          required
          aria-invalid={state.status === "error"}
          aria-describedby={messageId}
        />
        <Button
          type="submit"
          variant="accent"
          disabled={pending}
          className="shrink-0"
        >
          Suscribirme
        </Button>
      </div>
      <p
        id={messageId}
        role="status"
        className={cn(
          "mt-2 min-h-5 text-sm",
          state.status === "error" ? "font-medium text-ink" : "text-muted",
        )}
      >
        {state.message}
      </p>
    </form>
  );
}
