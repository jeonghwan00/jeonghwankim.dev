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
    title: `${project.title} — ${project.subtitle} | Jeonghwan Kim`,
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
    <div className="mx-auto max-w-3xl px-6 md:px-12 py-24" style={{ backgroundColor: "rgba(6, 14, 26, 0.85)" }}>
      {/* Back link */}
      <Link
        href="/#projects"
        className="text-sm text-[#64ffda] hover:underline"
      >
        &larr; Back to all projects
      </Link>

      {/* Header */}
      <div className="mt-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[#a0aec0]">
          Case Study — {project.title}
        </p>

        {project.caseStudyTitle ? (
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#e2e8f0] sm:text-4xl">
            {project.caseStudyTitle}
          </h1>
        ) : (
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#e2e8f0] sm:text-4xl">
            {project.title}
          </h1>
        )}

        <p className="mt-4 text-base text-[#a0aec0]">
          {project.summary}
        </p>

        {/* External links */}
        <div className="mt-4 flex flex-wrap gap-4">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-mono text-[#64ffda] hover:underline"
            >
              Visit Website
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr className="mt-10 border-[rgba(100,255,218,0.1)]" />

      {/* Problem */}
      <section className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#a0aec0]">Problem</h2>
        <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-[#e2e8f0]/90">
          {project.sections.problem}
        </p>
      </section>

      <hr className="mt-10 border-[rgba(100,255,218,0.1)]" />

      {/* My Role */}
      <section className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#a0aec0]">My Role</h2>
        <p className="mt-4 text-base leading-relaxed text-[#e2e8f0]/90">
          {project.sections.role}
        </p>
      </section>

      <hr className="mt-10 border-[rgba(100,255,218,0.1)]" />

      {/* Process */}
      <section className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#a0aec0]">Process</h2>
        {Array.isArray(project.sections.process) && project.sections.process.length > 0 && typeof project.sections.process[0] === 'string' ? (
          /* Flat list of steps */
          <ol className="mt-6 space-y-6">
            {(project.sections.process as string[]).map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(100,255,218,0.2)] text-sm text-[#a0aec0]">
                  {i + 1}
                </span>
                <p className="pt-1 text-base leading-relaxed text-[#e2e8f0]/90">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        ) : (
          /* Grouped sections (Product / UX / Engineering) */
          <div className="mt-6 space-y-10">
            {(project.sections.process as { label: string; steps: string[] }[]).map((group, gi) => (
              <div key={gi}>
                <h3 className="text-sm font-semibold text-[#64ffda] tracking-wide mb-4">
                  {group.label}
                </h3>
                <ol className="space-y-5">
                  {group.steps.map((step, si) => (
                    <li key={si} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(100,255,218,0.15)] text-xs text-[#a0aec0]">
                        {si + 1}
                      </span>
                      <p className="pt-0.5 text-base leading-relaxed text-[#e2e8f0]/90">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* User quote */}
      {project.quote && (
        <div className="mt-10 rounded-lg border-l-2 border-[#64ffda] bg-[rgba(100,255,218,0.05)] px-6 py-5">
          <p className="text-lg leading-relaxed text-[#e2e8f0]">
            &ldquo;{project.quote.text}&rdquo;
          </p>
          {project.quote.translation && (
            <p className="mt-2 text-sm text-[#a0aec0]">
              — {project.quote.source} (&ldquo;{project.quote.translation}&rdquo;)
            </p>
          )}
          {!project.quote.translation && (
            <p className="mt-2 text-sm text-[#a0aec0]">
              — {project.quote.source}
            </p>
          )}
        </div>
      )}

      <hr className="mt-10 border-[rgba(100,255,218,0.1)]" />

      {/* Outcomes — metric cards */}
      {project.metrics && (
        <section className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#a0aec0]">Outcomes</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="rounded-lg border border-[rgba(100,255,218,0.1)] bg-[rgba(100,255,218,0.03)] p-5"
              >
                <p className="text-2xl font-bold text-[#e2e8f0]">{metric.value}</p>
                <p className="mt-1 text-sm text-[#a0aec0]">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Outcome text (for projects without metrics) */}
      {!project.metrics && (
        <section className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#a0aec0]">Outcome</h2>
          <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-[#e2e8f0]/90">
            {project.sections.outcome}
          </p>
        </section>
      )}

      <hr className="mt-10 border-[rgba(100,255,218,0.1)]" />

      {/* Stack */}
      <section className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#a0aec0]">Stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
      </section>

      <hr className="mt-10 border-[rgba(100,255,218,0.1)]" />

      {/* What I Learned */}
      <section className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#a0aec0]">What I Learned</h2>
        <div className="mt-6 rounded-lg bg-[rgba(100,255,218,0.03)] p-6">
          <p className="whitespace-pre-line text-base leading-relaxed text-[#e2e8f0]/90">
            {project.sections.learned}
          </p>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <div className="mt-16 flex items-center justify-between border-t border-[rgba(100,255,218,0.1)] pt-8">
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="text-sm text-[#a0aec0] transition-colors hover:text-[#64ffda]"
          >
            &larr; {prev.title}
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="text-sm text-[#a0aec0] transition-colors hover:text-[#64ffda]"
          >
            {next.title} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
