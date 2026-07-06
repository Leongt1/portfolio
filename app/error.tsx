"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="hud-grid-bg flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="font-mono text-sm tracking-[0.25em] text-hud-red">
        {"// SYSTEM FAULT"}
        <span className="hud-blink ml-2 inline-block h-3 w-1.5 translate-y-0.5 bg-hud-red" aria-hidden />
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl font-bold uppercase tracking-wide">
        Something broke mid-mission
      </h1>
      <p className="mt-4 max-w-md text-hud-dim text-sm leading-relaxed">
        An unexpected error took this page down. You can attempt a restart, or fall back to base.
      </p>
      {error.digest && (
        <p className="mt-3 font-mono text-xs tracking-[0.2em] text-hud-dim">
          INCIDENT {"//"} {error.digest}
        </p>
      )}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="hud-btn hud-btn-outline px-8 py-3 font-mono text-sm tracking-[0.2em] font-semibold"
        >
          RETRY OPERATION
        </button>
        <Link
          href="/"
          className="hud-btn hud-btn-ghost px-8 py-3 font-mono text-sm tracking-[0.2em]"
        >
          RETURN TO BASE
        </Link>
      </div>
    </main>
  );
}
