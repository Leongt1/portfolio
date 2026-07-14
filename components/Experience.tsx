import { experience } from "@/data/experience";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="py-16 border-t border-hud-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="SERVICE RECORD" title="Experience" />
        </Reveal>

        <ol className="relative border-l border-hud-line2 space-y-12 pl-8">
          {experience.map((role, i) => (
            <li key={role.id} className="relative">
              <span
                className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rotate-45 bg-hud-red"
                aria-hidden
              />
              <Reveal delay={i * 100}>
                <p className="font-mono text-xs tracking-[0.2em] text-hud-cyan">{role.period}</p>
                <h3 className="mt-2 text-xl font-semibold uppercase tracking-wide">
                  {role.title}
                </h3>
                <p className="mt-1 font-mono text-sm text-hud-muted">
                  {role.org} <span className="text-hud-dim">· {role.location}</span>
                </p>
                <ul className="mt-4 space-y-2.5">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-hud-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 border border-hud-cyan" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
