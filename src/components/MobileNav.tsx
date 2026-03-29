"use client";

import { useEffect, useState } from "react";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export default function MobileNav() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
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
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center gap-1 bg-[#060e1a]/70 backdrop-blur-md border border-[rgba(100,255,218,0.15)] rounded-full shadow-lg shadow-black/20 px-2 py-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative flex flex-col items-center px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                isActive ? "text-[#64ffda]" : "text-[#a0aec0]"
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-1.5 h-[2px] rounded-full bg-[#64ffda] transition-all duration-300 ${
                  isActive ? "w-4" : "w-0"
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
