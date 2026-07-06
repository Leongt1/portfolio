import Link from "next/link";

export default function NotFound() {
  return (
    <main className="hud-grid-bg flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="font-mono text-sm tracking-[0.25em] text-hud-cyan">
        {"// SIGNAL LOST"}
        <span className="hud-blink ml-2 inline-block h-3 w-1.5 translate-y-0.5 bg-hud-cyan" aria-hidden />
      </p>
      <h1 className="mt-4 text-7xl sm:text-8xl font-bold tracking-wide text-hud-red">404</h1>
      <p className="mt-4 font-mono text-sm tracking-[0.2em] text-hud-muted uppercase">
        Sector not found on this map
      </p>
      <p className="mt-3 max-w-md text-hud-dim text-sm leading-relaxed">
        The coordinates you requested don&apos;t exist, or the intel was moved. Fall back to base
        and try another route.
      </p>
      <Link
        href="/"
        className="hud-btn hud-clip-btn mt-10 bg-hud-red px-8 py-3 font-mono text-sm tracking-[0.2em] font-semibold text-hud-bg"
      >
        RETURN TO BASE
      </Link>
    </main>
  );
}
