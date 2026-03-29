import Link from "next/link";
import { projects } from "@/data/projects";
import Badge from "./Badge";
import SectionFadeIn from "./SectionFadeIn";

const professionalItems = projects.filter((p) => p.type === "professional");

export default function ExperienceSection() {
  return (
    <section id="experience" className="mb-24">
      <h2 className="mb-8 text-base font-bold uppercase tracking-widest text-[#e2e8f0] lg:hidden">
        Experience
      </h2>
      <div className="group/list space-y-4">
        {professionalItems.map((item) => (
          <SectionFadeIn
            key={item.slug}
            className="transition-opacity duration-300 group-hover/list:opacity-50 hover:!opacity-100"
          >
            <Link
              href={`/projects/${item.slug}`}
              className="group relative grid grid-cols-[120px_1fr] gap-4 rounded-lg p-4 transition-all duration-300 spring-smooth hover:bg-[rgba(100,255,218,0.05)] hover:shadow-[inset_0_1px_0_0_rgba(100,255,218,0.1)] md:grid-cols-[140px_1fr]"
            >
              <div className="pt-1 text-xs font-mono uppercase tracking-wide text-[#a0aec0]">
                {item.timeline}
              </div>
              <div>
                <h3 className="font-medium leading-snug text-[#e2e8f0] group-hover:text-[#64ffda] transition-colors">
                  {item.role}{" "}
                  <span className="text-[#a0aec0]">· {item.title}</span>
                  <span className="ml-2 inline-block rounded-full bg-[#64ffda]/10 px-2 py-0.5 text-xs font-medium text-[#64ffda]">
                    Paid
                  </span>
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
                    className="ml-1 inline transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[#a0aec0]">
                  {item.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.roleTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#64ffda]/30 px-2 py-0.5 text-xs font-medium text-[#64ffda]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </SectionFadeIn>
        ))}
      </div>

      <div className="mt-8 pl-4">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1 text-sm font-medium text-[#e2e8f0] hover:text-[#64ffda] transition-colors"
        >
          View Full Resume
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
            className="transition-transform group-hover/link:translate-x-0.5"
          >
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
