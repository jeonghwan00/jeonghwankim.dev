import { projects } from "@/data/projects";
import FeaturedProject from "./FeaturedProject";
import ProjectCard from "./ProjectCard";
import SectionFadeIn from "./SectionFadeIn";

export default function ProjectsSection() {
  const personalProjects = projects.filter((p) => p.type === "project");
  const featured = personalProjects[0];
  const rest = personalProjects.slice(1);

  return (
    <section id="projects" className="mb-24">
      <h2 className="mb-8 text-base font-bold uppercase tracking-widest text-[#e2e8f0] lg:hidden">
        Projects
      </h2>

      <div className="group/list space-y-6">
        {/* Featured project — full width */}
        <SectionFadeIn className="transition-opacity duration-300 group-hover/list:opacity-50 hover:!opacity-100">
          <FeaturedProject project={featured} />
        </SectionFadeIn>

        {/* Rest — 2-column grid on larger screens */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {rest.map((project) => (
            <SectionFadeIn
              key={project.slug}
              className="transition-opacity duration-300 group-hover/list:opacity-50 hover:!opacity-100"
            >
              <ProjectCard project={project} />
            </SectionFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
