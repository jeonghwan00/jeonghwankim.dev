import HeroLanding from "@/components/HeroLanding";
import LeftPanel from "@/components/LeftPanel";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <>
      {/* Zone 1: Hero — 3D scene visible behind (transparent bg) */}
      <div className="relative z-10">
        <HeroLanding />
      </div>

      {/* Zone 2: Content — solid background, fully covers 3D */}
      <div
        className="relative z-20"
        style={{ backgroundColor: "#060e1a" }}
      >
        <div className="mx-auto max-w-screen-xl px-6 md:px-12 lg:px-24">
          <div className="lg:flex lg:gap-12">
            <div className="hidden lg:block lg:w-2/5">
              <LeftPanel />
            </div>
            <main id="content" className="py-20 lg:w-3/5 lg:py-24 max-w-2xl">
              <AboutSection />
              <ExperienceSection />
              <ProjectsSection />
              <footer className="mt-16 pb-8 text-sm text-[#a0aec0]">
                <p>
                  Built with{" "}
                  <span className="text-[#e2e8f0]">Next.js</span> and{" "}
                  <span className="text-[#e2e8f0]">Tailwind CSS</span>,
                  deployed on{" "}
                  <span className="text-[#e2e8f0]">Vercel</span>.
                </p>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
