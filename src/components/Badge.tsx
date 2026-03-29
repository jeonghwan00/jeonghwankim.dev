export default function Badge({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-full bg-[rgba(100,255,218,0.15)] px-3 py-1.5 text-sm font-mono text-[#a7ffeb]">
      {label}
    </span>
  );
}
