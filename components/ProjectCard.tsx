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
          className={`object-cover ${classified ? "opacity-70" : ""}`}
        />
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

        <div className="mt-auto pt-5 flex gap-5 font-mono text-xs tracking-[0.2em]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-underline text-hud-red"
            >
              LIVE ↗
            </a>
          )}
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
      </div>
    </article>
  );
}
