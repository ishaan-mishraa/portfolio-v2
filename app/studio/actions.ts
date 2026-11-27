"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { STUDIO_COOKIE, STUDIO_MAX_AGE, checkPassword, sessionToken } from "@/lib/studio-auth";

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
  const attempt = String(formData.get("password") ?? "");
  const token = sessionToken();

  if (!token || !checkPassword(attempt)) {
    await new Promise((r) => setTimeout(r, 1200)); // slow down guessing
    return { error: token ? "Wrong password." : "Studio is not configured on this deployment." };
  }

  (await cookies()).set(STUDIO_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: STUDIO_MAX_AGE,
  });
  redirect("/studio");
}

export async function logout() {
  (await cookies()).delete(STUDIO_COOKIE);
  redirect("/studio");
}
