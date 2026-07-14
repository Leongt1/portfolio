import { profile } from "@/data/profile";
import { SiGithub } from "react-icons/si";
import CountUp from "./CountUp";

export default function Hero() {
  return (
    <section id="home" className="relative pt-36 pb-24 hud-grid-bg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p
          className="hud-boot font-mono text-sm tracking-[0.25em] text-hud-cyan"
          style={{ "--boot-delay": "0ms" } as React.CSSProperties}
        >
          {"// AGENT PROFILE"}
          <span className="hud-blink ml-2 inline-block h-3 w-1.5 translate-y-0.5 bg-hud-cyan" aria-hidden />
        </p>

        <h1
          className="hud-boot mt-4 text-4xl sm:text-6xl font-bold uppercase tracking-wide"
          style={{ "--boot-delay": "120ms" } as React.CSSProperties}
        >
          {profile.name}
        </h1>

        <p
          className="hud-boot mt-4 font-mono text-sm sm:text-base tracking-[0.15em] text-hud-muted"
          style={{ "--boot-delay": "240ms" } as React.CSSProperties}
        >
          {profile.role.toUpperCase()} <span className="text-hud-red">{"//"}</span>{" "}
          {profile.stackLine.toUpperCase()}
          <span className="mx-3 text-hud-dim">·</span>
          {profile.location.toUpperCase()}
        </p>

        {profile.availability && (
          <div
            className="hud-boot mt-5 inline-flex items-center gap-2.5 border border-hud-line2 bg-hud-panel px-3 py-1.5"
            style={{ "--boot-delay": "300ms" } as React.CSSProperties}
          >
            <span className="hud-blink h-2 w-2 bg-hud-cyan" aria-hidden />
            <span className="font-mono text-[11px] tracking-[0.25em] text-hud-cyan">
              STATUS: {profile.availability}
            </span>
          </div>
        )}

        <p
          className="hud-boot mt-6 max-w-2xl text-lg text-hud-muted"
          style={{ "--boot-delay": "360ms" } as React.CSSProperties}
        >
          {profile.tagline}
        </p>

        <div
          className="hud-boot mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl"
          style={{ "--boot-delay": "480ms" } as React.CSSProperties}
        >
          {profile.stats.map((stat) => (
            <div
              key={stat.label}
              className="hud-clip border border-hud-line bg-hud-panel px-5 py-4"
            >
              <p className="text-3xl font-semibold text-hud-cyan">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-hud-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div
          className="hud-boot mt-10 flex flex-wrap gap-4"
          style={{ "--boot-delay": "600ms" } as React.CSSProperties}
        >
          <a
            href="#projects"
            className="hud-btn hud-btn-solid px-6 py-3 font-mono text-sm tracking-[0.2em] font-semibold"
          >
            VIEW PROJECTS
          </a>
          <a
            href={profile.resumeUrl}
            className="hud-btn hud-btn-ghost px-6 py-3 font-mono text-sm tracking-[0.2em]"
          >
            RÉSUMÉ
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hud-btn hud-btn-ghost flex items-center gap-2 px-6 py-3 font-mono text-sm tracking-[0.2em]"
          >
            <SiGithub className="h-4 w-4 shrink-0" aria-hidden />
            GITHUB ↗
          </a>
        </div>
      </div>
    </section>
  );
}
