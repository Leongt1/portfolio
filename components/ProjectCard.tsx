import Image from "next/image";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const classified = project.classified;

  return (
    <article
      className={`hud-brackets hud-clip group flex h-full flex-col bg-hud-panel transition-transform duration-200 hover:-translate-y-1 ${
        classified
          ? "border border-dashed border-hud-line2"
          : "border border-hud-line border-t-2 border-t-hud-red"
      }`}
    >
      <div className="relative aspect-video border-b border-hud-line bg-hud-panel2">
        <Image
          src={project.thumbnail}
          alt={classified ? "Classified project placeholder" : `${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover ${classified ? "opacity-70" : "opacity-80"}`}
        />
        {project.liveUrl && !classified && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} - open live site`}
            className="group/thumb absolute inset-0"
          >
            <span
              aria-hidden
              className="absolute top-2 right-2 font-mono text-sm text-hud-cyan [text-shadow:0_0_8px_rgba(10,14,19,0.9)] transition-transform duration-200 group-hover/thumb:translate-x-1 group-hover/thumb:-translate-y-1"
            >
              ↗
            </span>
            <span
              aria-hidden
              className="absolute bottom-2 right-2 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-hud-red [text-shadow:0_0_8px_rgba(255,70,85,0.6)]"
            >
              <span className="hud-blink-slow h-1.5 w-1.5 rounded-full bg-hud-red shadow-[0_0_6px_rgba(255,70,85,0.8)]" />
              LIVE
            </span>
          </a>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs tracking-[0.25em] text-hud-cyan">
          {String(index + 1).padStart(2, "0")} {"//"}{" "}
          <span className={classified ? "text-hud-dim" : ""}>{project.kicker.toUpperCase()}</span>
        </p>
        <h3
          className={`mt-2 text-xl font-semibold uppercase tracking-wide ${
            classified ? "text-hud-dim" : ""
          }`}
        >
          {project.title}
        </h3>
        <p className={`mt-3 text-sm leading-relaxed ${classified ? "text-hud-dim" : "text-hud-muted"}`}>
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border border-hud-line2 px-2 py-1 font-mono text-[11px] tracking-[0.15em] text-hud-muted"
            >
              {tag.toUpperCase()}
            </li>
          ))}
        </ul>

        {(project.repoUrl || classified) && (
          <div className="mt-auto pt-5 flex gap-5 font-mono text-xs tracking-[0.2em]">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hud-underline text-hud-cyan"
              >
                REPO ↗
              </a>
            )}
            {classified && <span className="text-hud-dim">ACCESS DENIED</span>}
          </div>
        )}
      </div>
    </article>
  );
}
