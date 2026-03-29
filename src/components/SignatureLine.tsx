export default function SignatureLine() {
  return (
    <svg
      width="100%"
      height="12"
      viewBox="0 0 420 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mt-2"
      style={{ maxWidth: "410px" }}
    >
      <path
        d="M2 6 C 40 2, 70 10, 110 6 S 170 2, 220 6 S 290 10, 340 6 S 390 2, 418 6"
        stroke="#64ffda"
        strokeWidth="2"
        strokeLinecap="round"
        className="svg-draw"
        style={{ "--line-length": 430 } as React.CSSProperties}
      />
    </svg>
  );
}
