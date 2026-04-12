export type ProjectType = "professional" | "project";

export interface Project {
  slug: string;
  type: ProjectType;
  title: string;
  subtitle: string;
  caseStudyTitle?: string;
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
  metrics?: { value: string; label: string }[];
  quote?: { text: string; translation?: string; source: string };
  sections: {
    problem: string;
    role: string;
    process: string[] | { label: string; steps: string[] }[];
    outcome: string;
    learned: string;
  };
}

export const projects: Project[] = [
  {
    slug: "soodori",
    type: "project",
    title: "Soodori (수돌이)",
    subtitle: "BaZi AI Fortune-Telling Web App",
    caseStudyTitle: "Two people close to me were each paying a lot for different fortune-telling apps. I thought I could build a better one.",
    summary:
      "Spotted a real market from watching people around me pay for saju apps. Built and shipped a multilingual AI fortune-telling product solo in under a week. Then cut the bundle size by 89%.",
    role: "Product Owner & Builder",
    timeline: "2025 — Present",
    website: "https://soodori.vercel.app",
    tags: ["Next.js 14", "TypeScript", "LLM API", "Supabase", "Tailwind CSS", "Vercel"],
    roleTags: ["Solo", "Product", "Full-Stack", "Performance", "AI Integration"],
    keyContribution: "Market validation → build → ship → optimize, all solo in under two weeks",
    thumbnail: {
      gradient: "from-amber-600/30 to-red-500/30",
      emoji: "🔮",
      image: "/images/projects/soodori.png",
    },
    metrics: [
      { value: "10", label: "Organic signups on day one via word of mouth" },
      { value: "-89%", label: "Client JS reduced: 415 kB → 45.5 kB" },
      { value: "3", label: "Languages supported: Korean, English, Chinese" },
    ],
    sections: {
      problem:
        "Two people close to me were each paying a lot for different saju (四柱, Chinese astrology) services. I watched them use it, and I kept hearing friends discuss their charts like it was the most important thing in the world. That told me this wasn't a niche hobby. People take this seriously, and they pay for it.\n\nI looked at what's out there. Posteller (포스텔러, 860M+ cumulative users) gives you pre-written readings based on your birth info. Useful, but there's no conversation. You can't ask follow-ups or go deeper on something specific. Jeomsin (점신) connects you with real fortune tellers over the phone, and they make money the longer the call goes. It works, but it's expensive, awkward for a lot of people, and you're at the mercy of whoever picks up.\n\nThen there's ChatGPT and general-purpose LLMs. People try them for saju readings, but they can't even calculate the four pillars correctly. They hallucinate chart data and have no understanding of the actual calendar system (만세력) behind it.\n\nThat was the gap. Combine the accuracy of a properly tuned calculation engine with the conversational depth of AI, in a UX where you don't have to talk to a stranger on the phone. Just type and get real answers about your actual chart.",
      role:
        "Entirely solo. Market research, product decisions, full-stack development, AI prompt engineering, domain-specific calculation logic, performance optimization, and deployment.",
      process: [
        {
          label: "Product",
          steps: [
            "Studied how the existing players monetize. Posteller charges per reading. Jeomsin connects you with fortune tellers over the phone and makes money the longer the call goes. Both profit from volume and time spent. My product is fundamentally different: conversational AI where users ask follow-ups and come back with new questions. I set up a freemium model (5 free conversations, then subscription tiers) to test willingness to pay before investing in growth.",
            "Built the core loop: birth info input, four pillars calculation, then AI chat. The key differentiator is the system prompt. I spent more time on prompt engineering than on the UI. The AI references the user's specific elements, explains jargon in plain language, and builds on previous answers. It feels like talking to someone who actually read your chart, not a template.",
            "Launched with zero marketing budget. Shared it with a few friends first, and they started spreading it through word of mouth. I built a referral system where users can share a referral code with friends even without paying, which lowered the barrier to invite others. 10 users signed up on day one, all organic.",
          ],
        },
        {
          label: "UX",
          steps: [
            "The home screen adapts based on how many profiles you have saved. New users see the birth info form right away. Returning users get a one-tap start button so they never re-enter their info. This sounds simple, but it required rethinking the entire page layout to handle both cases without feeling like two different apps.",
            "The compatibility feature went through several iterations. The first version had separate menus for 'my compatibility' vs 'between two other people,' which confused testers. Simplified it to one flow: just pick any two people from your saved profiles.",
            "Even small labeling choices mattered. The Korean word for the romantic relationship option went through three rounds. The first assumed the couple was already dating. The second excluded same-sex relationships. The final choice ('애정') covers all orientations and relationship stages.",
            "Supported three languages (Korean, English, Chinese) from day one. Not just translated strings, but adapted UX patterns. Korean users expect different date formats, different honorifics in the AI responses, and different cultural framing of the same BaZi concepts.",
          ],
        },
        {
          label: "Engineering",
          steps: [
            "Chose Next.js 14 with Supabase because I needed to ship fast, alone. Server-side API routes let me hide the LLM API key and keep sensitive logic off the client. Supabase gave me auth, database, and row-level security without managing infrastructure. Deployed on Vercel for instant previews during iteration.",
            "Solved a domain-specific accuracy problem that most apps get wrong. BaZi calculation depends on true solar time, not just timezone. A birth at 11:50 PM in western China (UTC+8) is actually a different solar hour than the same clock time in Shanghai, because the timezone spans 60 degrees of longitude. I implemented longitude-based correction using the city's coordinates, which can shift the hour pillar by up to 2 hours. Getting this wrong means the entire reading is based on the wrong chart.",
            "Encrypted birth data with AES-256-GCM before storing in Supabase. Birth date, time, and location are genuinely sensitive personal information, and users trust the app with data they wouldn't share publicly.",
            "Profiled the production build and found 1.9 MB of JavaScript being shipped to every visitor on page load. Traced it to three libraries: a 44,000-city timezone database (1.4 MB), the BaZi calculation engine (272 KB), and an HTML-to-canvas screenshot library (194 KB). All loaded on page mount despite only being needed on specific user actions.",
            "Moved the city database to a server-side API route, eliminating 1.4 MB from the client entirely. Converted the calculator and screenshot library to dynamic imports triggered on user action. Replaced render-blocking Google Font @imports with next/font. Result: page JS went from 415 kB to 45.5 kB, an 89% reduction.",
          ],
        },
      ],
      outcome:
        "Shipped a working product with multilingual support (Korean, English, Chinese), multi-profile management, compatibility readings, and a freemium payment flow. Unlike the existing apps which serve static readings, users can ask follow-up questions, dig into specific topics, and get answers that reference their actual chart elements.\n\nOn the technical side, reduced First Load JS from 512 kB to 143 kB through four targeted optimizations. The biggest win was recognizing that a 1.4 MB city database didn't belong on the client at all. That single architectural decision removed 73% of the bundle.\n\nThe product is live and being iterated on. Next steps are character-driven UI redesign and expanding the compatibility feature to group readings.",
      learned:
        "The biggest lesson was about knowing when you're looking at a real market versus a personal interest. I didn't start with an idea for an app. I started by noticing that people around me were already paying for something, and the existing products weren't that good. That's a very different starting point than 'I think this would be cool to build.'\n\nOn the technical side, I learned to measure before optimizing. I assumed the BaZi calculator would be the heaviest part of the bundle. It wasn't. A city timezone database I'd barely thought about was 73% of the problem. I only found it by reading the raw bytes of each webpack chunk, not by guessing.\n\nThe other thing that stuck with me: every static import is a bet that the user needs that code immediately. For most libraries, that bet is wrong. Aligning when code loads with when the user actually needs it is a simple principle, but applying it cut the bundle by 89%.",
    },
  },
  {
    slug: "selah",
    type: "project",
    title: "Selah",
    subtitle: "AI-Powered CBT & Spiritual Wellness App",
    caseStudyTitle: "Building a mental health app for a community that already knew how to support each other",
    summary:
      "Solo product, 0 → 90+ active users. React Native · LLM API · Supabase",
    role: "Product Owner & Builder",
    timeline: "2024 — Present",
    website: "https://selah-co.com",
    tags: ["React Native + Expo", "Supabase / PostgreSQL", "LLM API", "AI-powered thought analysis", "Community-driven growth"],
    roleTags: ["Solo", "Product", "AI Integration", "User Research", "Community"],
    keyContribution: "0 → 90+ active users through community-driven growth. Preparing for launch.",
    thumbnail: {
      gradient: "from-purple-600/30 to-pink-500/30",
      emoji: "🧠",
      image: "/images/projects/selah.jpg",
    },
    metrics: [
      { value: "90+", label: "Active users, community-grown" },
      { value: "~100%", label: "7-day retention on prayer room — users return daily to update and respond to requests" },
      { value: "Now", label: "Preparing for launch with monetization" },
    ],
    quote: {
      text: "핸드폰을 보다가 멈추고 기도하게 된 경험은 처음인 것 같다. 너무 좋았다.",
      translation: "This was the first time I ever found myself praying while on my phone. It felt really good.",
      source: "User feedback during church pilot",
    },
    sections: {
      problem:
        "My girlfriend was going through a difficult time. CBT research shows emotions are shaped not by events directly, but by the thoughts that interpret them. I wanted to build something that could help her identify cognitive distortions and reframe her thinking — and eventually help others do the same.\n\nI built the first version for one user. Then I watched what happened when I handed it to more.",
      role:
        "Entirely solo — product strategy, AI integration, UX design, React Native development, user research, and community engagement. No team, no budget, no runway.",
      process: [
        "Built an initial CBT tool using the LLM API to guide users through identifying cognitive distortions and reframing negative thoughts. Used it daily with my girlfriend as the first real user.",
        "A Christian friend tried it and said he'd actively use it. That observation led to a hypothesis: targeting users at the intersection of mental health and faith would create a stronger, more specific product than a generic mental health tool.",
        "Repositioned the product. Added personalized Bible verse recommendations and redesigned the experience around both emotional and spiritual support.",
        "Embedded myself in church communities — observing how people share prayer requests and support each other weekly. Translated this into an anonymous prayer room where users could share and support each other online.",
        "Analyzed retention across all features. Prayer room drove near-100% 7-day retention — community lock-in by design. Observed continued DB activity: users returned daily to update and respond to prayer requests. Cut every other feature and surfaced prayer room directly to the main navigation.",
        "Grew to 90+ active users through community engagement and ran a church pilot to validate the product in a real-world setting. One removed feature is now being reinstated — users kept asking for it back.",
      ],
      outcome:
        "90+ active users with strong engagement and retention. Users expressed willingness to continue using the product if launched. Qualitative feedback highlighted genuine trust in the experience. Now preparing for launch with monetization.",
      learned:
        "The hardest part was designing for vulnerable moments. You can't fake empathy in UX — every word, every screen transition, every notification matters when someone is in a difficult place. Trust is built or broken at the detail level.\n\nThe best product decisions came from going narrow. Targeting a specific community instead of building for everyone made the product stronger. The prayer room wasn't a feature I designed from scratch — it was something I saw already happening in real life, and built a digital version of it.",
    },
  },
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
        "Reviewed App Store reviews (4.8 stars) to identify recurring pain points, what users love, and feature gaps.",
      ],
      outcome:
        "Three things I'd change:\n\n1. Show a before/after audio comparison after each session. Scores are helpful, but hearing your own improvement is way more motivating. The compare feature already exists — it's just buried. Surfacing it at the end of every session would make progress feel real.\n\n2. Add a 'read and practice' mode in AI Chat. Right now it's free conversation, but people naturally avoid sounds they're bad at. If my TH scored 58%, give me sentences packed with TH sounds to read out loud — 'The weather this Thursday will be thirty degrees.' The SpeechScan data is already there, just use it to generate targeted sentences.\n\n3. The onboarding question 'How often do you speak English?' should let you pick multiple contexts instead of one. Most people use English for work and socially, and the stakes are different in each. Multi-select would let the app personalize better — including which Role-Play scenarios to show first.",
      learned:
        "I went through App Store reviews to see what real users say. A few patterns came up repeatedly:\n\nWhat users love — the sound-level feedback and the compare/record feature. These are the core of the product and people come back for them.\n\nCommon frustration — the AI sometimes keeps flagging the same sound as wrong even after the user has improved. It feels like hitting a wall, and I can see how that kills momentum.\n\nFeature gap — several users asked for the ability to choose their own words to practice, instead of only working through coach-selected ones.\n\nOverall the product is strong. 4.8 stars and 5M downloads speaks for itself. The gaps are small but the kind that affect whether someone practices daily or drops off.",
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
    tags: ["Flutter", "Dart", "TypeScript", "Next.js", "AWS", "Supabase", "PostgreSQL"],
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
        "Initially built the backend on AWS — Amplify for auth, Lambda for serverless functions, RDS PostgreSQL for the database. Noticed costs climbing: the always-on RDS instance was charging even with near-zero traffic. Investigated options — Aurora Serverless for scale-to-zero, smaller instance types, reserved pricing — but concluded that for 5 pilot users, optimizing AWS was itself over-engineering.",
        "Migrated to Supabase instead. Same PostgreSQL, so the schema carried over cleanly. Auth moved from Amplify to Supabase Auth. The decision wasn't about AWS being bad — it was about matching infrastructure to the current stage. AWS makes sense at scale; Supabase made sense at 5 users.",
      ],
      outcome:
        "Validated product-market fit through user research before building. Shipped a working cross-platform tool spanning mobile (Flutter), desktop (native C++/Swift), and web (Next.js). Migrated from AWS to Supabase, cutting infrastructure costs to near-zero while keeping the same PostgreSQL schema. Pilot users reported the daily tracking flow took under 30 seconds.",
      learned:
        "Two lessons. First — I kept adding features to stand out, but pilot users just wanted the core flow to be fast and simple. I removed most of what I'd built. Shipping less was harder and better. Second — infrastructure decisions are product decisions. AWS wasn't wrong, it was wrong for the stage. Knowing when to optimize vs. when to switch is a skill I use in every project now.",
    },
  },
];
