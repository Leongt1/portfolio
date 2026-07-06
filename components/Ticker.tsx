import { skillGroups } from "@/data/skills";

const items = skillGroups.flatMap((group) => group.items);

/** Decorative scrolling strip of stack keywords between sections. */
export default function Ticker({ reversed = false }: { reversed?: boolean }) {
  const line = items.map((item) => item.toUpperCase()).join("  //  ");
  const copy = `${line}  //  `;

  return (
    <div
      aria-hidden
      className="hud-ticker border-y border-hud-line bg-hud-panel2 py-3 select-none"
    >
      <div className={`hud-ticker-track ${reversed ? "is-reversed" : ""}`}>
        <span className="font-mono text-xs tracking-[0.3em] text-hud-dim pr-2">{copy}</span>
        <span className="font-mono text-xs tracking-[0.3em] text-hud-dim pr-2">{copy}</span>
      </div>
    </div>
  );
}
