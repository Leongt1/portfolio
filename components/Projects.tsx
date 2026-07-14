import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import TiltCard from "./TiltCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="MISSION LOG" title="Projects" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 100} className="h-full">
              <TiltCard>
                <ProjectCard project={project} index={i} />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
