import type { CorrectionCategory, InlineCorrection } from "@/types/ielts";

/**
 * Tiny rule-based stand-in for the real AI model: finds a handful of common
 * learner errors in the actual text so the result page shows real matches.
 */
interface Rule {
  pattern: RegExp;
  category: CorrectionCategory;
  fix: (match: string) => string;
  explanation: string;
}

const contractions: Record<string, string> = {
  dont: "do not",
  doesnt: "does not",
  cant: "cannot",
  wont: "will not",
  isnt: "is not",
  didnt: "did not",
  "don't": "do not",
  "doesn't": "does not",
  "can't": "cannot",
  "won't": "will not",
  "isn't": "is not",
  "didn't": "did not",
};

const uncountable: Record<string, string> = {
  informations: "information",
  advices: "advice",
  knowledges: "knowledge",
  equipments: "equipment",
  researches: "research",
  peoples: "people",
};

const rules: Rule[] = [
  {
    pattern: /\bi\b/g,
    category: "spelling",
    fix: () => "I",
    explanation: "The pronoun “I” is always written with a capital letter.",
  },
  {
    pattern: /\balot\b/gi,
    category: "spelling",
    fix: () => "a lot",
    explanation: "“A lot” is two words. In formal writing prefer “a great deal” or “many”.",
  },
  {
    pattern: /\b(dont|doesnt|cant|wont|isnt|didnt|don't|doesn't|can't|won't|isn't|didn't)\b/gi,
    category: "vocabulary",
    fix: (m) => contractions[m.toLowerCase()] ?? m,
    explanation: "Avoid contractions in academic writing — use the full form.",
  },
  {
    pattern: /\bmore (better|worse|easier|bigger|cheaper|faster)\b/gi,
    category: "grammar",
    fix: (m) => m.split(" ")[1],
    explanation: "A comparative adjective already means “more” — do not add “more”.",
  },
  {
    pattern: /\b(informations|advices|knowledges|equipments|researches|peoples)\b/gi,
    category: "grammar",
    fix: (m) => uncountable[m.toLowerCase()] ?? m,
    explanation: "This noun is uncountable (or already plural) and does not take “-s”.",
  },
  {
    pattern: /\b(gonna|wanna|kids|stuff)\b/gi,
    category: "vocabulary",
    fix: (m) =>
      ({ gonna: "going to", wanna: "want to", kids: "children", stuff: "things" })[m.toLowerCase()] ?? m,
    explanation: "This word is informal. Choose a neutral, academic alternative.",
  },
  {
    pattern: /\bin my opinion,? i think\b/gi,
    category: "coherence",
    fix: () => "In my opinion,",
    explanation: "“In my opinion” and “I think” say the same thing — keep only one.",
  },
  {
    pattern: /\b(\w+) \1\b/gi,
    category: "coherence",
    fix: (m) => m.split(" ")[0],
    explanation: "The same word is repeated twice in a row.",
  },
  {
    pattern: / ,/g,
    category: "punctuation",
    fix: () => ",",
    explanation: "Do not put a space before a comma.",
  },
];

const MAX_CORRECTIONS = 8;

export function detectCorrections(text: string): InlineCorrection[] {
  const found: InlineCorrection[] = [];
  const seen = new Set<string>();

  for (const rule of rules) {
    for (const match of text.matchAll(rule.pattern)) {
      const original = match[0];
      const key = original.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      found.push({
        id: `auto-${found.length}`,
        original,
        suggestion: rule.fix(original),
        explanation: rule.explanation,
        category: rule.category,
      });
      if (found.length >= MAX_CORRECTIONS) return found;
    }
  }
  return found;
}
