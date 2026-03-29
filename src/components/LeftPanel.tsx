"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import SignatureLine from "./SignatureLine";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export default function LeftPanel() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section with the largest intersection ratio
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7],
        rootMargin: "-10% 0px -40% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Handle edge case: scrolled to bottom but last section doesn't fill viewport
    const handleScroll = () => {
      const scrollBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;
      if (scrollBottom) {
        setActiveSection("projects");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:py-24">
      {/* Top: Name and title */}
      <div>
        <h2 className="text-4xl font-bold tracking-tight text-[#e2e8f0] sm:text-5xl">
          <a href="/">{siteConfig.name}</a>
        </h2>
        <SignatureLine />
        <h2 className="mt-3 text-lg font-medium text-[#e2e8f0]">
          {siteConfig.title}
        </h2>
        <p className="mt-2 max-w-xs text-[#a0aec0]">
          I speak both product and code.
        </p>

        {/* Navigation — visible only on large screens */}
        <nav className="mt-16 hidden lg:block" aria-label="In-page navigation">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`group flex items-center gap-4 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-[#e2e8f0]"
                      : "text-[#a0aec0] hover:text-[#e2e8f0]"
                  }`}
                >
                  <span
                    className={`block h-px transition-all duration-200 ${
                      activeSection === item.id
                        ? "w-16 bg-[#e2e8f0]"
                        : "w-8 bg-[#a0aec0] group-hover:w-16 group-hover:bg-[#e2e8f0]"
                    }`}
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom: Social links */}
      <div className="mt-8 flex items-center gap-5 lg:mt-0">
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-[#a0aec0] transition-colors hover:text-[#64ffda]"
        >
          <Github size={20} />
        </a>
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-[#a0aec0] transition-colors hover:text-[#64ffda]"
        >
          <Linkedin size={20} />
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          aria-label="Email"
          className="text-[#a0aec0] transition-colors hover:text-[#64ffda]"
        >
          <Mail size={20} />
        </a>
      </div>
    </header>
  );
}
