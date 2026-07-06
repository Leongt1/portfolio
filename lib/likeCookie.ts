import { createHmac, timingSafeEqual } from "crypto";

/**
 * Signed "already liked" marker. httpOnly so client JS can't read it,
 * HMAC-signed so it can't be forged without the server secret. Deleting
 * it lets a visitor like again — accepted residual risk, bounded by the
 * per-IP rate limit.
 */

export const LIKE_COOKIE = "ngt_liked";
const PAYLOAD = "liked-v1";

function secret(): string {
  const s = process.env.LIKE_COOKIE_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV === "production") {
    console.warn("[likes] LIKE_COOKIE_SECRET not set — using build-time fallback");
  }
  return "dev-only-like-secret";
}

export function signedLikeValue(): string {
  const mac = createHmac("sha256", secret()).update(PAYLOAD).digest("hex");
  return `${PAYLOAD}.${mac}`;
}

export function isValidLikeValue(value: string | undefined): boolean {
  if (!value) return false;
  const expected = signedLikeValue();
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
