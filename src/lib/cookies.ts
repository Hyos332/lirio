import "server-only";

import { cookies } from "next/headers";

export const DAY = 60 * 60 * 24;

export async function setPersistentCookie(
  name: string,
  value: string,
  maxAge: number,
) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}
