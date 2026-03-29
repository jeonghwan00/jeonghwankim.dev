import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/Badge";
import { projects } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found | Jeonghwan" };
  }

  return {
    title: `${project.title} — ${project.subtitle} | Jeonghwan`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const prev = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const next =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <div className="mx-auto max-w-3xl px-6 md:px-12 py-24">
      {/* Back link */}
      <Link
        href="/#projects"
        className="text-sm text-[#64ffda] hover:underline"
      >
        &larr; Back to all projects
      </Link>

      {/* Header */}
      <div className="mt-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-[#e2e8f0]">
          {project.title}
        </h1>
        <p className="text-lg text-[#a0aec0]">{project.subtitle}</p>

        {/* Metadata row */}
        <p className="text-sm text-[#a0aec0]">
          {project.role} | {project.timeline}
        </p>

        {/* External links */}
        <div className="flex flex-wrap gap-4">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-mono text-[#64ffda] hover:underline"
            >
              Visit Website
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-mono text-[#64ffda] hover:underline"
            >
              View on GitHub
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* Case study sections */}
      <div className="mt-16 space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#e2e8f0]">Problem</h2>
          <p className="leading-relaxed text-[#a0aec0]">
            {project.sections.problem}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#e2e8f0]">My Role</h2>
          <p className="leading-relaxed text-[#a0aec0]">
            {project.sections.role}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#e2e8f0]">Process</h2>
          <ul className="list-disc space-y-2 pl-6 text-[#a0aec0]">
            {project.sections.process.map((step, i) => (
              <li key={i} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#e2e8f0]">Outcome</h2>
          <p className="whitespace-pre-line leading-relaxed text-[#a0aec0]">
            {project.sections.outcome}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#e2e8f0]">
            What I Learned
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-[#a0aec0]">
            {project.sections.learned}
          </p>
        </section>
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-16 flex items-center justify-between border-t border-[rgba(100,255,218,0.1)] pt-8">
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="text-sm text-[#a0aec0] transition-colors hover:text-[#64ffda]"
          >
            &larr; Previous: {prev.title}
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="text-sm text-[#a0aec0] transition-colors hover:text-[#64ffda]"
          >
            Next: {next.title} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
