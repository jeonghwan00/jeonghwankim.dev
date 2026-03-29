import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#e2e8f0]">404</h1>
        <p className="mt-4 text-lg text-[#a0aec0]">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded border border-[#64ffda] px-6 py-3 font-mono text-sm text-[#64ffda] transition-colors hover:bg-[rgba(100,255,218,0.1)]"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
