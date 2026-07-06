import LikeButton from "./LikeButton";

export default function Footer() {
  return (
    <footer className="border-t border-hud-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:px-6 sm:flex-row">
        <p className="font-mono text-xs tracking-[0.2em] text-hud-dim">
          NGT<span className="text-hud-red">{"//"}</span> {new Date().getFullYear()} · DEPLOYED ON VERCEL
        </p>
        <LikeButton />
        <p className="font-mono text-xs tracking-[0.2em] text-hud-dim">
          END OF TRANSMISSION <span className="hud-blink text-hud-cyan">▮</span>
        </p>
      </div>
    </footer>
  );
}
