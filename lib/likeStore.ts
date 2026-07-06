"use client";

/**
 * Shared client store for the like button (footer + floating pill read the
 * same state). Global mode talks to /api/likes - the server owns the count.
 * When the API reports unavailable (no Redis configured), falls back to the
 * original local-only localStorage behavior.
 */

const LIKED_KEY = "portfolio:liked";
const COUNT_KEY = "portfolio:likeCount";

type LikeState = {
  mode: "loading" | "global" | "local";
  count: number;
  liked: boolean;
  busy: boolean;
};

let state: LikeState = { mode: "loading", count: 0, liked: false, busy: false };
const listeners = new Set<() => void>();
let initPromise: Promise<void> | null = null;

function setState(patch: Partial<LikeState>) {
  state = { ...state, ...patch };
  listeners.forEach((fn) => fn());
}

function readLocal(): Pick<LikeState, "count" | "liked"> {
  return {
    liked: localStorage.getItem(LIKED_KEY) === "1",
    count: Number(localStorage.getItem(COUNT_KEY)) || 0,
  };
}

function init(): Promise<void> {
  initPromise ??= (async () => {
    try {
      const res = await fetch("/api/likes");
      const json = await res.json();
      if (res.ok && json.available) {
        setState({ mode: "global", count: json.count, liked: json.liked });
        return;
      }
    } catch {
      // fall through to local mode
    }
    setState({ mode: "local", ...readLocal() });
  })();
  return initPromise;
}

export function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  void init();
  return () => listeners.delete(callback);
}

export function getSnapshot(): LikeState {
  return state;
}

const SERVER_SNAPSHOT: LikeState = { mode: "loading", count: 0, liked: false, busy: false };
export function getServerSnapshot(): LikeState {
  return SERVER_SNAPSHOT;
}

export async function toggleLike(): Promise<void> {
  if (state.busy || state.mode === "loading") return;

  if (state.mode === "local") {
    const liked = !state.liked;
    const count = Math.max(0, state.count + (liked ? 1 : -1));
    localStorage.setItem(LIKED_KEY, liked ? "1" : "0");
    localStorage.setItem(COUNT_KEY, String(count));
    setState({ liked, count });
    return;
  }

  // global mode: optimistic update, server response is authoritative
  const prev = { count: state.count, liked: state.liked };
  setState({
    busy: true,
    liked: !prev.liked,
    count: Math.max(0, prev.count + (prev.liked ? -1 : 1)),
  });
  try {
    const res = await fetch("/api/likes", { method: "POST" });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "like failed");
    setState({ busy: false, count: json.count, liked: json.liked });
  } catch {
    setState({ busy: false, ...prev });
  }
}
