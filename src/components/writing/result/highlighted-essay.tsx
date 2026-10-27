import type { InlineCorrection } from "@/types/ielts";

type Segment = { text: string; correction?: InlineCorrection };

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Word boundaries only where the fragment starts/ends with a word character. */
const toPattern = (original: string) =>
  `${/^\w/.test(original) ? "\\b" : ""}${escapeRegExp(original)}${/\w$/.test(original) ? "\\b" : ""}`;

/**
 * Splits the essay into plain text and segments that match a correction.
 * Matching is case-sensitive so a lowercase "i" never highlights a correct "I".
 */
function segment(text: string, corrections: InlineCorrection[]): Segment[] {
  if (corrections.length === 0) return [{ text }];
  const byOriginal = new Map(corrections.map((c) => [c.original, c]));
  const pattern = new RegExp(`(${corrections.map((c) => toPattern(c.original)).join("|")})`, "g");
  return text
    .split(pattern)
    .filter((part) => part !== "")
    .map((part) => ({ text: part, correction: byOriginal.get(part) }));
}

/** The submitted essay with corrected fragments underlined and linked to their fix. */
export function HighlightedEssay({ text, corrections }: { text: string; corrections: InlineCorrection[] }) {
  return (
    <div className="max-h-96 overflow-y-auto rounded-lg border bg-muted/30 p-4 text-sm leading-7 whitespace-pre-wrap">
      {segment(text, corrections).map((part, i) =>
        part.correction ? (
          <a
            key={i}
            href={`#correction-${part.correction.id}`}
            title={part.correction.suggestion}
            className="rounded-sm bg-rose-100 px-0.5 underline decoration-rose-500 decoration-wavy underline-offset-4 dark:bg-rose-950/60"
          >
            {part.text}
          </a>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </div>
  );
}
