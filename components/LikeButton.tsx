"use client";

import { useState, useSyncExternalStore } from "react";

const LIKED_KEY = "portfolio:liked";
const COUNT_KEY = "portfolio:likeCount";
const CHANGE_EVENT = "portfolio:likechange";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

/**
 * Local-only MVP like button (PRD 7.2 fallback).
 * Phase 2: swap the localStorage count for GET/POST /api/likes (Upstash).
 */
export default function LikeButton() {
  const liked = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(LIKED_KEY) === "1",
    () => false
  );
  const count = useSyncExternalStore(
    subscribe,
    () => Number(localStorage.getItem(COUNT_KEY)) || 0,
    () => 0
  );
  const [pulse, setPulse] = useState(false);

  function toggle() {
    const nextLiked = !liked;
    localStorage.setItem(LIKED_KEY, nextLiked ? "1" : "0");
    localStorage.setItem(COUNT_KEY, String(Math.max(0, count + (nextLiked ? 1 : -1))));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    if (nextLiked) {
      setPulse(true);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      aria-label={liked ? "Unlike this site" : "Like this site"}
      className="group inline-flex items-center gap-3 border border-hud-line2 hud-clip-btn px-4 py-2 hover:border-hud-red transition-colors"
    >
      <span
        onAnimationEnd={() => setPulse(false)}
        className={`text-lg leading-none ${pulse ? "hud-pulse" : ""} ${
          liked ? "text-hud-red" : "text-hud-dim group-hover:text-hud-muted"
        }`}
        aria-hidden
      >
        {liked ? "♥" : "♡"}
      </span>
      <span className="font-mono text-xs tracking-[0.2em] text-hud-muted">
        LIKES {"//"} {String(count).padStart(3, "0")}
      </span>
    </button>
  );
}
