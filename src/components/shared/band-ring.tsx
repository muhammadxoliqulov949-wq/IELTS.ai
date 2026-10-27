import { formatBand } from "@/lib/band";
import type { BandScore } from "@/types/ielts";

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Circular 0–9 band gauge. */
export function BandRing({ band, label }: { band: BandScore; label: string }) {
  const offset = CIRCUMFERENCE * (1 - band / 9);

  return (
    <div className="relative size-36 shrink-0" role="img" aria-label={`${label}: ${formatBand(band)}`}>
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        <circle cx="60" cy="60" r={RADIUS} fill="none" strokeWidth="10" className="stroke-muted" />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="stroke-primary transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <span className="block text-4xl font-extrabold tabular-nums">{formatBand(band)}</span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      </div>
    </div>
  );
}
