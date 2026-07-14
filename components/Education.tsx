import { education } from "@/data/education";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="py-16 border-t border-hud-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="TRAINING" title="Education" />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {education.map((entry, i) => (
            <Reveal key={entry.id} delay={i * 80}>
              <div className="hud-clip h-full border border-hud-line bg-hud-panel p-6">
                <p className="font-mono text-xs tracking-[0.2em] text-hud-cyan">{entry.period}</p>
                <h3 className="mt-2 text-lg font-semibold">{entry.degree}</h3>
                <p className="mt-1 text-sm text-hud-muted">{entry.school}</p>
                <p className="mt-3 font-mono text-xs tracking-[0.15em] text-hud-dim">
                  {entry.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
