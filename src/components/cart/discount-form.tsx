"use client";

import { useActionState, useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextLink } from "@/components/ui/text-link";
import {
  applyDiscountCode,
  removeDiscountCode,
  type DiscountState,
} from "@/lib/actions/cart";
import type { DiscountCode } from "@/lib/commerce/types";
import { cn } from "@/lib/cn";

const idle: DiscountState = { status: "idle", message: "", code: "" };

export function DiscountForm({ codes }: { codes: DiscountCode[] }) {
  const [state, action, pending] = useActionState(applyDiscountCode, idle);
  const inputId = useId();
  const messageId = useId();
  const applied = codes.filter((code) => code.applicable);

  return (
    <div>
      <form action={action} className="flex gap-2">
        <label htmlFor={inputId} className="sr-only">
          Código de descuento
        </label>
        <Input
          id={inputId}
          name="code"
          shape="rounded"
          size="sm"
          placeholder="Código de descuento"
          autoComplete="off"
          defaultValue={state.code}
          aria-invalid={state.status === "error"}
          aria-describedby={messageId}
        />
        <Button
          type="submit"
          variant="secondary"
          size="sm"
          disabled={pending}
          className="shrink-0"
        >
          Aplicar
        </Button>
      </form>
      <p
        id={messageId}
        role="status"
        className={cn(
          "mt-2 text-sm empty:mt-0",
          state.status === "error" ? "font-medium text-ink" : "text-muted",
        )}
      >
        {state.message}
      </p>
      {applied.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-2">
          {applied.map(({ code }) => (
            <li
              key={code}
              className="flex items-center gap-2 rounded-pill bg-surface-2 pr-2 pl-4 font-mono text-xs uppercase"
            >
              {code}
              <form action={removeDiscountCode.bind(null, code)}>
                <TextLink
                  type="submit"
                  tone="muted"
                  className="font-sans text-xs normal-case"
                >
                  Quitar
                </TextLink>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
