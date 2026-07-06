import { NextRequest, NextResponse } from "next/server";
import { getLikesBackend } from "@/lib/likesBackend";
import { isValidLikeValue, LIKE_COOKIE, signedLikeValue } from "@/lib/likeCookie";

/**
 * Global like counter. The server is authoritative: the count lives in
 * Redis, "already liked" lives in a signed httpOnly cookie, and the
 * client's request body is never trusted (POST takes no body at all).
 */

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
};

function clientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

export async function GET(request: NextRequest) {
  const backend = getLikesBackend();
  if (!backend) {
    return NextResponse.json({ available: false });
  }
  const liked = isValidLikeValue(request.cookies.get(LIKE_COOKIE)?.value);
  const count = await backend.getCount();
  return NextResponse.json({ available: true, count, liked });
}

export async function POST(request: NextRequest) {
  const backend = getLikesBackend();
  if (!backend) {
    return NextResponse.json({ error: "Like counter not configured." }, { status: 503 });
  }

  if (!(await backend.rateCheck(clientIp(request)))) {
    return NextResponse.json({ error: "Slow down, agent." }, { status: 429 });
  }

  const liked = isValidLikeValue(request.cookies.get(LIKE_COOKIE)?.value);
  const count = liked ? await backend.decr() : await backend.incr();

  const res = NextResponse.json({ available: true, count, liked: !liked });
  if (liked) {
    res.cookies.set(LIKE_COOKIE, "", { ...COOKIE_OPTS, maxAge: 0 });
  } else {
    res.cookies.set(LIKE_COOKIE, signedLikeValue(), COOKIE_OPTS);
  }
  return res;
}
