import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Private resume studio: one owner, one password (env RESUME_STUDIO_PASSWORD).
// The session cookie holds an HMAC derived from the password, so changing the
// password signs every existing session out. Server-only module.

export const STUDIO_COOKIE = "studio_session";
export const STUDIO_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function password(): string | null {
  const p = process.env.RESUME_STUDIO_PASSWORD;
  return p && p.length >= 12 ? p : null; // refuse weak or missing passwords
}

function sha(s: string) {
  return createHmac("sha256", "resume-studio-v1").update(s).digest();
}

export function sessionToken(): string | null {
  const p = password();
  return p ? createHmac("sha256", p).update("resume-studio-session-v1").digest("hex") : null;
}

export function checkPassword(attempt: string): boolean {
  const p = password();
  if (!p) return false;
  return timingSafeEqual(sha(attempt), sha(p)); // equal-length digests, constant-time compare
}

export function isValidSession(value: string | undefined): boolean {
  const token = sessionToken();
  if (!token || !value || value.length !== token.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(token));
}

export async function hasStudioSession(): Promise<boolean> {
  return isValidSession((await cookies()).get(STUDIO_COOKIE)?.value);
}

export const studioConfigured = () => password() !== null;
