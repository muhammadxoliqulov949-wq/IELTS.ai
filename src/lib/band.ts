import type { BandScore } from "@/types/ielts";

const clamp = (band: number) => Math.min(9, Math.max(0, band));

/**
 * Writing: the four criteria are averaged and rounded DOWN to the nearest
 * half band (6.75 → 6.5, 6.25 → 6.0).
 */
export function roundWritingBand(criteria: BandScore[]): BandScore {
  if (criteria.length === 0) return 0;
  const avg = criteria.reduce((sum, b) => sum + b, 0) / criteria.length;
  return clamp(Math.floor(avg * 2) / 2);
}

/**
 * Overall test band: .25 rounds up to .5 and .75 rounds up to the next
 * whole band (6.25 → 6.5, 6.75 → 7.0).
 */
export function roundOverallBand(avg: number): BandScore {
  return clamp(Math.round(avg * 2) / 2);
}

export function formatBand(band: BandScore): string {
  return band.toFixed(1);
}

/** Tailwind text colour for a band, used for scores and badges. */
export function bandTone(band: BandScore): string {
  if (band >= 7) return "text-emerald-600 dark:text-emerald-400";
  if (band >= 5.5) return "text-amber-600 dark:text-amber-400";
  return "text-rose-600 dark:text-rose-400";
}
