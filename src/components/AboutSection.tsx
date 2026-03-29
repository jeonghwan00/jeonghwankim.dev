import SectionFadeIn from "./SectionFadeIn";

export default function AboutSection() {
  return (
    <section id="about" className="mb-24">
      <SectionFadeIn>
        <h2 className="mb-8 text-base font-bold uppercase tracking-widest text-[#e2e8f0] lg:hidden">
          About
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-[#a0aec0]">
          <p>
            I care about{" "}
            <span className="text-[#e2e8f0]">people</span>.
            I started in neuroscience research — designing a game
            that helps reduce depressive symptoms through brainwave regulation.
            That experience taught me that{" "}
            <span className="text-[#e2e8f0]">
              small UX decisions create real human impact
            </span>.
          </p>
          <p>
            Now I build products with that same mindset.
            I lead{" "}
            <span className="text-[#e2e8f0]">user research</span>,{" "}
            <span className="text-[#e2e8f0]">roadmaps</span>, and{" "}
            <span className="text-[#e2e8f0]">prioritization</span> —
            and I understand the technical trade-offs
            because I&apos;ve built every product I&apos;ve managed.
          </p>
          <p>
            I bridge engineering and business.
            I talk to users, write specs engineers respect,
            and make decisions without needing a translator.
          </p>
          <p className="text-[#a0aec0]">
            Seoul National University · Neuroscience
          </p>
        </div>
      </SectionFadeIn>
    </section>
  );
}
