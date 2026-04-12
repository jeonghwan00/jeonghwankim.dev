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
            I started in neuroscience research, designing a game
            that helps reduce depressive symptoms through brainwave regulation.
            That experience taught me that{" "}
            <span className="text-[#e2e8f0]">
              small UX decisions create real human impact
            </span>.
          </p>
          <p>
            Now I build products end-to-end.
            I do the{" "}
            <span className="text-[#e2e8f0]">market research</span>,
            make the{" "}
            <span className="text-[#e2e8f0]">product decisions</span>,
            write the{" "}
            <span className="text-[#e2e8f0]">code</span>,
            and ship it myself.
            Every project in my portfolio was built by me, not just managed.
          </p>
          <p>
            I think about business when I&apos;m engineering,
            and I think about engineering when I&apos;m making product decisions.
            That overlap is where I do my best work.
          </p>
          <p className="text-[#a0aec0]">
            Georgia Institute of Technology · Computer Science
          </p>
        </div>
      </SectionFadeIn>
    </section>
  );
}
