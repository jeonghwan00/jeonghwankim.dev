import Link from "next/link";
import type { Project } from "@/data/projects";
import Badge from "./Badge";

export default function FeaturedProject({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block overflow-hidden rounded-lg border border-[rgba(100,255,218,0.15)] transition-all duration-300 spring-smooth hover:bg-[rgba(100,255,218,0.05)] hover:border-[rgba(100,255,218,0.35)] hover:shadow-lg"
    >
      {/* Large thumbnail */}
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
          <span className="text-6xl opacity-80 transition-transform duration-300 group-hover:scale-110">
            {project.thumbnail.emoji}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Featured label + Role tags */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#64ffda]/10 px-2.5 py-0.5 text-xs font-bold text-[#64ffda]">
            Featured
          </span>
          {project.roleTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#64ffda]/30 px-2 py-0.5 text-xs font-medium text-[#64ffda]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-[#e2e8f0] group-hover:text-[#64ffda] transition-colors">
          {project.title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="ml-2 inline transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </h3>

        <p className="mt-1 text-base text-[#a0aec0]">{project.subtitle}</p>

        {/* Key contribution - highlighted */}
        <p className="mt-4 rounded-md bg-[rgba(100,255,218,0.05)] px-3 py-2 text-sm font-medium text-[#e2e8f0]">
          → {project.keyContribution}
        </p>

        {/* Meta */}
        <p className="mt-4 text-sm font-mono text-[#a0aec0]/70">
          {project.role} · {project.timeline}
        </p>

        {/* Summary */}
        <p className="mt-3 leading-relaxed text-[#a0aec0]">
          {project.summary}
        </p>

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
