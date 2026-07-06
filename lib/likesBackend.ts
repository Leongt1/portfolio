import { Redis } from "@upstash/redis";

/**
 * Server-side storage for the global like counter.
 * - Upstash Redis when UPSTASH_REDIS_REST_URL/TOKEN are set (production path).
 * - In-memory fallback in development so the full flow works without creds.
 * - null in production without creds → the API reports unavailable and the
 *   client stays in local-only mode.
 */

const LIKES_KEY = "portfolio:likes";
const RATE_LIMIT_PER_MINUTE = 10;

export type LikesBackend = {
  getCount(): Promise<number>;
  incr(): Promise<number>;
  decr(): Promise<number>;
  /** true = allowed, false = rate limited */
  rateCheck(ip: string): Promise<boolean>;
};

function upstashBackend(url: string, token: string): LikesBackend {
  const redis = new Redis({ url, token });
  return {
    async getCount() {
      return (await redis.get<number>(LIKES_KEY)) ?? 0;
    },
    async incr() {
      return redis.incr(LIKES_KEY);
    },
    async decr() {
      const next = await redis.decr(LIKES_KEY);
      if (next < 0) {
        await redis.set(LIKES_KEY, 0);
        return 0;
      }
      return next;
    },
    async rateCheck(ip) {
      const key = `rl:likes:${ip}`;
      const hits = await redis.incr(key);
      if (hits === 1) {
        await redis.expire(key, 60);
      }
      return hits <= RATE_LIMIT_PER_MINUTE;
    },
  };
}

function memoryBackend(): LikesBackend {
  let count = 0;
  const hits = new Map<string, { n: number; resetAt: number }>();
  return {
    async getCount() {
      return count;
    },
    async incr() {
      return ++count;
    },
    async decr() {
      count = Math.max(0, count - 1);
      return count;
    },
    async rateCheck(ip) {
      const now = Date.now();
      const entry = hits.get(ip);
      if (!entry || entry.resetAt < now) {
        hits.set(ip, { n: 1, resetAt: now + 60_000 });
        return true;
      }
      entry.n += 1;
      return entry.n <= RATE_LIMIT_PER_MINUTE;
    },
  };
}

// Module-level singleton; in dev, survives across requests within a server
// process (resets on restart, which is fine for local testing).
let backend: LikesBackend | null | undefined;

export function getLikesBackend(): LikesBackend | null {
  if (backend !== undefined) return backend;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    backend = upstashBackend(url, token);
  } else if (process.env.NODE_ENV !== "production") {
    console.warn("[likes] no Upstash env vars - using in-memory dev backend");
    backend = memoryBackend();
  } else {
    backend = null;
  }
  return backend;
}
