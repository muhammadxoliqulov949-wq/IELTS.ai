import { roundWritingBand } from "@/lib/band";
import type {
  CriterionScore,
  InlineCorrection,
  WritingFeedback,
  WritingTask,
  WritingTaskType,
} from "@/types/ielts";

/**
 * Template "AI" feedback per task type. The mock evaluator copies one of
 * these and adjusts it to the submitted text (word count, detected errors).
 */
interface FeedbackTemplate {
  criteria: CriterionScore[];
  corrections: InlineCorrection[];
  tips: [string, string, string];
}

export const feedbackTemplates: Record<WritingTaskType, FeedbackTemplate> = {
  task1: {
    criteria: [
      {
        key: "taskResponse",
        band: 6.5,
        summary: "Key features are covered, but the overview could be clearer.",
        strengths: ["All main categories are mentioned", "Data is reported accurately"],
        weaknesses: ["No clear overview sentence", "Some minor figures are over-described"],
      },
      {
        key: "coherenceCohesion",
        band: 6.5,
        summary: "Information is logically organised with mostly appropriate linking.",
        strengths: ["Clear paragraphing by city"],
        weaknesses: ["Repetitive use of “and” and “also”"],
      },
      {
        key: "lexicalResource",
        band: 6,
        summary: "Adequate vocabulary for trends, with some repetition.",
        strengths: ["Correct use of “proportion” and “figure”"],
        weaknesses: ["“Increase” is repeated many times", "Limited synonyms for comparison"],
      },
      {
        key: "grammaticalRange",
        band: 6.5,
        summary: "A mix of simple and complex sentences with occasional errors.",
        strengths: ["Accurate comparatives"],
        weaknesses: ["Article errors with percentages", "Few passive structures"],
      },
    ],
    corrections: [
      {
        id: "tpl1-1",
        original: "The chart shows percent of people",
        suggestion: "The chart illustrates the percentage of people",
        explanation: "Use the noun “percentage” with an article; “illustrates” is more formal.",
        category: "vocabulary",
      },
      {
        id: "tpl1-2",
        original: "Car was most popular in city B",
        suggestion: "Cars were the most popular option in City B",
        explanation: "Plural countable noun and “the” before a superlative.",
        category: "grammar",
      },
    ],
    tips: [
      "Write a two-sentence overview right after the introduction that names the biggest and smallest categories.",
      "Group data by similarity instead of describing every bar one by one.",
      "Vary trend language: “account for”, “make up”, “a mere”, “roughly double”.",
    ],
  },
  task2: {
    criteria: [
      {
        key: "taskResponse",
        band: 6.5,
        summary: "Both views are discussed and an opinion is given, but ideas need fuller support.",
        strengths: ["Clear position in the introduction", "Both sides are addressed"],
        weaknesses: ["Examples are general rather than specific", "Conclusion repeats the introduction"],
      },
      {
        key: "coherenceCohesion",
        band: 7,
        summary: "Well-organised paragraphs with a clear progression of ideas.",
        strengths: ["Each paragraph has a clear central idea", "Good use of referencing"],
        weaknesses: ["Some mechanical linkers (“Firstly… Secondly…”)"],
      },
      {
        key: "lexicalResource",
        band: 6.5,
        summary: "A sufficient range of vocabulary with some less common items.",
        strengths: ["Good collocations: “bear the cost”, “equal access”"],
        weaknesses: ["Occasional informal words", "Word-form errors"],
      },
      {
        key: "grammaticalRange",
        band: 6,
        summary: "Complex structures are attempted but errors are noticeable.",
        strengths: ["Conditionals used correctly"],
        weaknesses: ["Subject–verb agreement slips", "Run-on sentences"],
      },
    ],
    corrections: [
      {
        id: "tpl2-1",
        original: "Education is very important thing",
        suggestion: "Education is a very important asset",
        explanation: "Countable nouns need an article; “thing” is too vague for academic writing.",
        category: "grammar",
      },
      {
        id: "tpl2-2",
        original: "In my opinion I think",
        suggestion: "In my opinion,",
        explanation: "“In my opinion” and “I think” mean the same thing — use only one.",
        category: "coherence",
      },
    ],
    tips: [
      "Support every main idea with one specific, realistic example (a country, a statistic or a situation).",
      "Paraphrase your position in the conclusion instead of repeating the introduction word for word.",
      "Replace mechanical linkers with topic sentences that connect ideas: “A further concern is…”.",
    ],
  },
};

/** Unmodified template result, shown when no submission is stored. */
export function getSampleFeedback(task: WritingTask): WritingFeedback {
  const template = feedbackTemplates[task.type];
  return {
    submissionId: `${task.id}-sample`,
    taskType: task.type,
    overallBand: roundWritingBand(template.criteria.map((c) => c.band)),
    criteria: template.criteria,
    corrections: template.corrections,
    tips: template.tips,
  };
}
