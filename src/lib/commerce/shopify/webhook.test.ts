import { createHmac } from "node:crypto";

import { describe, expect, it } from "vitest";

import { isValidWebhook } from "./webhook";

const secret = "secreto-de-prueba";
const body = JSON.stringify({ id: 1, title: "Audífonos" });
const sign = (payload: string) =>
  createHmac("sha256", secret).update(payload).digest("base64");

describe("isValidWebhook", () => {
  it("acepta una firma correcta", () => {
    expect(isValidWebhook(body, sign(body), secret)).toBe(true);
  });

  it("rechaza un cuerpo modificado", () => {
    expect(isValidWebhook(`${body} `, sign(body), secret)).toBe(false);
  });

  it("rechaza una firma ausente o con otro largo", () => {
    expect(isValidWebhook(body, null, secret)).toBe(false);
    expect(isValidWebhook(body, "corta", secret)).toBe(false);
  });
});
