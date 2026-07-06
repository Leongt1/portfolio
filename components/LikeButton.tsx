"use client";

import { useState, useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe, toggleLike } from "@/lib/likeStore";

type LikeButtonProps = {
  /** "floating" renders the compact fixed-corner style */
  variant?: "default" | "floating";
};

/**
 * Global like counter backed by /api/likes (server-authoritative count,
 * signed httpOnly cookie for liked-state). Falls back to local-only
 * localStorage mode when the backend isn't configured. All instances
 * share state through lib/likeStore.
 */
export default function LikeButton({ variant = "default" }: LikeButtonProps) {
  const { count, liked } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [pulse, setPulse] = useState(false);

  function handleClick() {
    if (!liked) {
      setPulse(true);
    }
    void toggleLike();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={liked ? "Unlike this site" : "Like this site"}
      className={`group inline-flex items-center gap-3 border hud-clip-btn transition-colors hover:border-hud-red ${
        variant === "floating"
          ? "border-hud-line2 bg-hud-panel/90 px-3.5 py-2 backdrop-blur"
          : "border-hud-line2 px-4 py-2"
      }`}
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
