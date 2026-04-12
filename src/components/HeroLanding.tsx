"use client";

import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import SignatureLine from "./SignatureLine";

export default function HeroLanding() {
  return (
    <section className="relative flex h-screen flex-col items-center justify-center px-6 text-center">
      {/* Subtle dark vignette for text readability over 3D */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(10, 25, 47, 0.6) 0%, transparent 100%)",
        }}
      />
      <div className="relative">
        <h1 className="hero-text-glow text-5xl font-bold tracking-tight text-[#e2e8f0] sm:text-7xl">
          {siteConfig.name}
        </h1>
        <SignatureLine />
        <h2 className="hero-text-glow mt-4 text-xl font-medium text-[#e2e8f0] sm:text-2xl">
          {siteConfig.title}
        </h2>
        <p className="mt-2 text-[#a0aec0]">
          I find the market, build the product, and ship the code.
        </p>

        {/* Social links */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#a0aec0] transition-colors hover:text-[#64ffda]"
          >
            <Github size={22} />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#a0aec0] transition-colors hover:text-[#64ffda]"
          >
            <Linkedin size={22} />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Email"
            className="text-[#a0aec0] transition-colors hover:text-[#64ffda]"
          >
            <Mail size={22} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to content"
        className="absolute bottom-10 animate-bounce text-[#64ffda] transition-opacity hover:opacity-70"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
