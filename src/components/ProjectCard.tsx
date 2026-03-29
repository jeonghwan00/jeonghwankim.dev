import Link from "next/link";
import type { Project } from "@/data/projects";
import Badge from "./Badge";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block overflow-hidden rounded-lg border border-[rgba(100,255,218,0.1)] transition-all duration-300 spring-smooth hover:bg-[rgba(100,255,218,0.05)] hover:border-[rgba(100,255,218,0.25)]"
    >
      {/* Thumbnail */}
      <div
        className={`relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br ${project.thumbnail.gradient}`}
      >
        {project.thumbnail.image ? (
          <img
            src={project.thumbnail.image}
            alt={`${project.title} screenshot`}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-4xl opacity-80 transition-transform duration-300 group-hover:scale-110">
            {project.thumbnail.emoji}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Role tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.roleTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#64ffda]/30 px-2 py-0.5 text-xs font-medium text-[#64ffda]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title + arrow */}
        <h3 className="text-lg font-semibold text-[#e2e8f0] group-hover:text-[#64ffda] transition-colors">
          {project.title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="ml-1.5 inline transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </h3>

        <p className="mt-1 text-sm text-[#a0aec0]">{project.subtitle}</p>

        {/* Key contribution */}
        <p className="mt-3 text-sm font-medium text-[#e2e8f0]/80">
          → {project.keyContribution}
        </p>

        {/* Timeline */}
        <p className="mt-3 text-xs font-mono text-[#a0aec0]/70">
          {project.timeline}
        </p>

        {/* Tech tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
