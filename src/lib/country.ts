import "server-only";

import { cookies, headers } from "next/headers";
import { cache } from "react";

import { env } from "@/env";
import { getCountries } from "@/lib/commerce";

export const COUNTRY_COOKIE = "country";

const GEO_HEADERS = ["x-vercel-ip-country", "cf-ipcountry"];

export const getCountry = cache(async () => {
  const [countries, cookieStore, headerStore] = await Promise.all([
    getCountries(),
    cookies(),
    headers(),
  ]);

  const candidates = [
    cookieStore.get(COUNTRY_COOKIE)?.value,
    ...GEO_HEADERS.map((name) => headerStore.get(name)),
    env.SHOPIFY_COUNTRY,
  ];

  const country =
    candidates
      .map((code) => countries.find((entry) => entry.isoCode === code))
      .find(Boolean) ?? countries[0];

  if (!country) throw new Error("La tienda no tiene países disponibles.");
  return country;
});
