import { skillGroups } from "@/data/skills";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="py-16 border-t border-hud-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="LOADOUT" title="Skills" />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 80}>
              <div className="hud-clip h-full border border-hud-line bg-hud-panel p-6">
                <p className="font-mono text-xs tracking-[0.25em] text-hud-cyan">
                  {"// "}
                  {group.label}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-2 border border-hud-line2 px-3 py-1.5 font-mono text-xs tracking-[0.1em] text-hud-text hover:border-hud-cyan hover:text-hud-cyan transition-colors"
                    >
                      <item.icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
