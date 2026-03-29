export type ProjectType = "professional" | "project";

export interface Project {
  slug: string;
  type: ProjectType;
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  timeline: string;
  tags: string[];
  roleTags: string[];
  keyContribution: string;
  thumbnail: {
    gradient: string;
    emoji: string;
    image?: string;
  };
  github?: string;
  website?: string;
  sections: {
    problem: string;
    role: string;
    process: string[];
    outcome: string;
    learned: string;
  };
}

export const projects: Project[] = [
  {
    slug: "boldvoice-case-study",
    type: "project",
    title: "BoldVoice",
    subtitle: "Product Case Study — Accent Training App",
    summary:
      "Product teardown and 3 actionable improvement suggestions for BoldVoice (YC S21), an AI-powered accent training app with 5M+ downloads.",
    role: "Product Analysis",
    timeline: "2026",
    tags: ["Product Teardown", "UX Analysis", "AI/ML", "Speech Tech"],
    roleTags: ["Product Thinking", "UX Analysis", "Data-Driven"],
    keyContribution: "3 actionable improvements based on user research and app analysis",
    thumbnail: {
      gradient: "from-indigo-600/30 to-violet-500/30",
      emoji: "🗣️",
      image: "/images/projects/boldvoice.png",
    },
    website: "https://www.boldvoice.com",
    sections: {
      problem:
        "BoldVoice (YC S21) is an accent training app that helps non-native English speakers speak clearly and confidently. It combines video lessons from Hollywood accent coaches with real-time AI speech feedback. 5M+ downloads, 4.8 stars, featured on Forbes and TechCrunch. I downloaded the app, went through onboarding, assessment, and practice sessions to identify opportunities for improvement.",
      role:
        "Independent product analysis — onboarding walkthrough, assessment completion, practice sessions, user review analysis, and competitive evaluation.",
      process: [
        "Went through the full onboarding: value prop screens (Hollywood coaches, AI feedback, SpeechScan), expectation-setting timeline (Week 1 → Year 1+), pricing comparison vs 1:1 coaching ($150/yr vs $150-300/hr), and a transparent 7-day trial flow with Day 5 reminder and opt-out toggle.",
        "Completed the 20-sentence initial assessment. Scored 90% overall. The results screen shows Top 3 Strengths (N: 94%, K: 93%, NG: 93%) and Top 3 Focus Areas (TH: 58%, Z: 84%, OH vs OW: 87%) — color-coded green/yellow/red. Sound-level highlighting in sentences shows exactly which letters were mispronounced.",
        "Went through the practice session: 'Challenge Words' targeting my weak sounds. Each sentence gets a circular score (87-99%), with 'You' vs 'Coach' audio comparison buttons. The AI flags specific sounds in red/yellow within the sentence text.",
        "Analyzed the post-assessment flow: SpeechScan identifies focus areas, locks additional focus areas behind '3 more days of practice' — a smart retention hook. The skill tree (1-6) unlocks progressively, creating a Duolingo-style progression system.",
        "Reviewed 70,000+ App Store reviews (4.8 stars) to identify recurring pain points, what users love, and feature gaps.",
      ],
      outcome:
        "Three things I'd change:\n\n1. Show a before/after audio comparison after each session. Scores are helpful, but hearing your own improvement is way more motivating. The compare feature already exists — it's just buried. Surfacing it at the end of every session would make progress feel real.\n\n2. Add a 'read and practice' mode in AI Chat. Right now it's free conversation, but people naturally avoid sounds they're bad at. If my TH scored 58%, give me sentences packed with TH sounds to read out loud — 'The weather this Thursday will be thirty degrees.' The SpeechScan data is already there, just use it to generate targeted sentences.\n\n3. The onboarding question 'How often do you speak English?' should let you pick multiple contexts instead of one. Most people use English for work and socially, and the stakes are different in each. Multi-select would let the app personalize better — including which Role-Play scenarios to show first.",
      learned:
        "I went through App Store reviews to see what real users say. A few patterns came up repeatedly:\n\nWhat users love — the sound-level feedback and the compare/record feature. These are the core of the product and people come back for them.\n\nCommon frustration — the AI sometimes keeps flagging the same sound as wrong even after the user has improved. It feels like hitting a wall, and I can see how that kills momentum.\n\nFeature gap — several users asked for the ability to choose their own words to practice, instead of only working through coach-selected ones.\n\nOverall the product is strong. 4.8 stars and 5M downloads speaks for itself. The gaps are small but the kind that affect whether someone practices daily or drops off.",
    },
  },
  {
    slug: "selah",
    type: "project",
    title: "Selah",
    subtitle: "AI-Powered CBT & Spiritual Wellness App",
    summary:
      "Started as a personal tool for my girlfriend, grew to ~100 weekly active users through church community engagement. Uses the Claude API for cognitive distortion analysis. Preparing for launch with monetization.",
    role: "Product Owner & Builder",
    timeline: "2024 — Present",
    website: "https://selah-co.com",
    tags: ["React Native", "Expo", "TypeScript", "Claude API", "Supabase", "PostgreSQL"],
    roleTags: ["Solo", "Product", "AI Integration", "User Research", "Community"],
    keyContribution: "0 → 100 active test users through community-driven growth. Preparing for launch.",
    thumbnail: {
      gradient: "from-purple-600/30 to-pink-500/30",
      emoji: "🧠",
      image: "/images/projects/selah.jpg",
    },
    sections: {
      problem:
        "My girlfriend was going through a difficult time. CBT teaches that emotions are shaped not by events directly, but by the thoughts that interpret those events. I wanted to build something that could help her — and eventually others — identify cognitive distortions and reframe their thinking.",
      role:
        "I designed, built, and grew the product entirely solo — product strategy, AI integration, UX design, React Native development, user research, and community engagement.",
      process: [
        "Built an initial CBT tool using the Claude API to guide users through identifying cognitive distortions and reframing negative thoughts. Used it together with my girlfriend as the first user.",
        "A friend tried the app and said he'd actively use it as a product. Since he's a practicing Christian, I hypothesized that focusing on a specific audience — people seeking both emotional and spiritual support — would be stronger than building a broad mental health tool.",
        "Integrated personalized Bible verse recommendations and redesigned the experience for users at the intersection of mental health and faith.",
        "Engaged directly with church communities — observing how people share prayer requests and support each other weekly. Translated this into an anonymous 'prayer room' feature where users could share and support each other online.",
        "Grew to ~100 weekly active users through community engagement and ran a small church pilot to validate the product in real-world settings.",
        "Built the full stack: React Native + Expo frontend, Supabase/PostgreSQL backend, Claude API integration for AI-powered thought analysis.",
      ],
      outcome:
        "~100 weekly active users with strong engagement and retention. Users expressed willingness to continue using the product if launched. Qualitative feedback highlighted the trust and authenticity of the experience. Now preparing for launch with monetization.",
      learned:
        "The hardest part was designing a product that handles sensitive emotional experiences while maintaining trust and authenticity. You can't fake empathy in UX — every word, every screen transition, every notification matters when someone is vulnerable. I also learned that the best product decisions came from going narrow: targeting a specific community instead of building for everyone made the product stronger, not weaker.",
    },
  },
  {
    slug: "snu-neurofeedback",
    type: "professional",
    title: "Rabbit the Miner — Lee Lab, SNU",
    subtitle: "EEG Neurofeedback Game for Depression Research",
    summary:
      "Designed the game UX, per-round feedback system, and data dashboard for a neurofeedback game. Decided what brainwave stats to show, when, and how to drive improvement. 10 participants, significant results.",
    role: "Developer & Researcher",
    timeline: "2022 — 2023",
    tags: ["Python", "Pygame", "EEG", "FAA", "Neuroscience"],
    roleTags: ["Product Management", "UX Design", "Data Dashboard", "Research"],
    keyContribution: "Designed feedback UX and data dashboard that drove significant brainwave improvement",
    thumbnail: {
      gradient: "from-amber-600/30 to-orange-500/30",
      emoji: "🐰",
      image: "/images/projects/rabbit-the-miner.jpg",
    },
    sections: {
      problem:
        "Research shows that regulating Frontal Alpha Asymmetry (FAA) can reduce depressive symptoms. But existing neurofeedback paradigms are clinical and boring — participants disengage, data quality drops, and the therapeutic effect weakens. We needed an engaging way to train FAA regulation.",
      role:
        "On a 5-person research team at Lee Lab, I owned the game UX, feedback system design, and data dashboard — deciding what brainwave stats to surface, when to show them, and how to structure per-round feedback to drive improvement.",
      process: [
        "Designed the core game loop: when a player successfully regulates their FAA, the rabbit mines ore. Sustained regulation triggers a 'fever time' bonus round, rewarding consistent brainwave control.",
        "Intentionally gave no instructions on how to regulate FAA — players discovered their own mental strategies through trial and error, which is more effective for long-term learning than prescriptive guidance.",
        "Designed a per-round feedback system: positive or negative feedback after each round helped players progressively improve their brainwave regulation ability across sessions.",
        "Built the data dashboard showing real-time brainwave metrics — choosing which stats to surface and when, balancing scientific accuracy with player comprehension.",
        "Made the system compatible with multiple brainwave metrics beyond FAA, so it can be adapted for different neurofeedback research paradigms.",
      ],
      outcome:
        "Ran the experiment with 10 participants and achieved statistically significant improvement in brainwave regulation across rounds. Players got competitive, found their own strategies, and genuinely enjoyed the experience — even wearing unfamiliar EEG equipment. The per-round feedback system was the key driver of progressive improvement.",
      learned:
        "This project changed how I think about products. I joined the lab because I care deeply about people — about psychology, about how to make someone's life a little better. Seeing participants improve their mental state through a game I designed, without even realizing they were training their brain, showed me that small UX decisions create real human impact. Previous neurofeedback tools just beeped when brainwaves changed. We built something people actually wanted to play. That gap — between functional and meaningful — is what I want to close in every product I work on.",
    },
  },
  {
    slug: "veralex",
    type: "professional",
    title: "VeraLex",
    subtitle: "Legal Tech Platform & Admin Dashboard",
    summary:
      "Led product at a legal tech startup. Designed a 4-tier role-based admin dashboard, case management system, and lawyer-client matching.",
    role: "Product Lead",
    timeline: "2025 — Present",
    website: "https://veralex.co",
    tags: ["Next.js 14", "TypeScript", "Supabase", "Tailwind CSS", "shadcn/ui"],
    roleTags: ["Product Lead", "UX Design", "Team"],
    keyContribution: "Designed 4-tier role system and led product direction across 2 apps",
    thumbnail: {
      gradient: "from-blue-600/30 to-cyan-500/30",
      emoji: "⚖️",
      image: "/images/projects/veralex.webp",
    },
    sections: {
      problem:
        "Legal service platforms need to manage complex workflows — matching lawyers to clients, reviewing applications, and tracking cases. Existing tools are fragmented, with no single system handling the full pipeline from intake to resolution.",
      role:
        "I led product direction and built the frontend for a multi-role admin dashboard and a client-facing portal. Responsible for architecture decisions, UI implementation, and user flows.",
      process: [
        "Designed and built a 4-tier role-based dashboard (Super Admin, Admin, Reviewer, Analyst) with scoped access control and audit logging using Supabase Row Level Security.",
        "Implemented a case management system with status tracking and assignment workflows.",
        "Built a lawyer-client matching interface that surfaces relevant lawyers based on case type, jurisdiction, and availability.",
        "Developed the client-facing portal with application submission, status tracking, and secure document upload.",
        "Deployed on Vercel with Supabase (PostgreSQL + Auth) as the backend. Used shadcn/ui for consistent component design across the platform.",
      ],
      outcome:
        "Shipped a working platform with role-based access control, case management, and a client portal. Two Next.js 14 applications with a shared Supabase backend.",
      learned:
        "Building multi-role systems forces you to think about every screen from four different perspectives. The hardest UX problem was making the same data useful to an admin who manages everything and an analyst who only needs a slice.",
    },
  },
  {
    slug: "stamp-mind",
    type: "project",
    title: "Stamp Mind",
    subtitle: "Cross-Platform Productivity & Goal Tracking App",
    summary:
      "Ran user interviews and surveys, built a waitlist of ~100 people, and piloted with 5 real users. Built a cross-platform productivity app across Flutter mobile, native desktop (C++/Swift), and Next.js web.",
    role: "Product Owner & Builder",
    timeline: "2024 — 2025",
    tags: ["Flutter", "Dart", "TypeScript", "Next.js", "C++", "Swift"],
    roleTags: ["Solo", "Product", "User Research", "Mobile", "Desktop"],
    keyContribution: "100 waitlist signups, 5 pilot users, 3-platform product built solo",
    thumbnail: {
      gradient: "from-emerald-600/30 to-teal-500/30",
      emoji: "✅",
      image: "/images/projects/stamp-mind.jpg",
    },
    sections: {
      problem:
        "Existing productivity apps treat task management and self-awareness as separate problems. Users need a single tool that tracks what they're working on and helps them reflect on how they spend their time.",
      role:
        "I owned the entire product lifecycle solo — user research, waitlist management, pilot testing, and building across three platforms.",
      process: [
        "Conducted user interviews and surveys to validate the problem space and understand how people currently track their time and goals.",
        "Built a landing page and collected ~100 waitlist signups before writing a single line of product code — validating demand first.",
        "Recruited 5 pilot users from the waitlist and ran hands-on testing sessions, iterating on the core experience based on real usage patterns.",
        "Built the mobile app with Flutter/Dart for cross-platform task and goal management with a clean, friction-free daily interface.",
        "Developed a native desktop activity tracker (C++/Swift) that reads window metadata to automatically log what users work on.",
        "Connected desktop tracking to the mobile app for unified productivity insights across devices.",
      ],
      outcome:
        "Validated product-market fit through user research before building. Shipped a working cross-platform tool spanning mobile (Flutter), desktop (native C++/Swift), and web (Next.js). Pilot users reported the daily tracking flow took under 30 seconds.",
      learned:
        "I kept adding features to make the product stand out — desktop tracking, cross-device sync, analytics dashboards. But pilot users told me they just wanted the core daily flow to be fast and simple. I ended up removing most of what I'd built and keeping only the main experience. Shipping less was the harder and better decision.",
    },
  },
];
