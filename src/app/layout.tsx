import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SkipToContent from "@/components/SkipToContent";
import BackgroundScene from "@/components/three/BackgroundScene";
import MobileNav from "@/components/MobileNav";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jeonghwan Kim | Product Engineer — Product, Engineering, UX",
  description:
    "Product Engineer with an engineering background. I speak both product and code. Experience across AI legal tech, mental health apps, productivity tools, and neuroscience research.",
  openGraph: {
    title: "Jeonghwan Kim | Product Engineer",
    description:
      "Product Engineer with an engineering background. I bridge product, engineering, and UX.",
    siteName: "Jeonghwan Kim — Product Engineer",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jeonghwan Kim",
  jobTitle: "Product Engineer",
  url: "https://jeonghwankim.dev",
  knowsAbout: [
    "Product Management",
    "User Research",
    "React",
    "TypeScript",
    "UX Design",
    "Full-Stack Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <SkipToContent />
        <BackgroundScene />
        <MobileNav />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
