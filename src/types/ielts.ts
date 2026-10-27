/**
 * Shared IELTS domain types. Every module (writing, reading, dashboard)
 * imports from here so mock data and future API responses share one shape.
 */

// ---------- Common ----------

export type Skill = "listening" | "reading" | "writing" | "speaking";

/** IELTS band: 0–9 in 0.5 steps. */
export type BandScore = number;

// ---------- Writing ----------

export type WritingTaskType = "task1" | "task2";

export type Task1VisualKind = "bar" | "line" | "pie" | "table" | "process" | "map";

export interface WritingTask {
  id: string;
  type: WritingTaskType;
  title: string;
  prompt: string;
  /** Minimum recommended word count: 150 for Task 1, 250 for Task 2. */
  minWords: number;
  /** Time limit in minutes: 20 for Task 1, 40 for Task 2. */
  timeLimitMinutes: number;
  /** Task 1 only: what kind of visual the prompt describes. */
  visual?: {
    kind: Task1VisualKind;
    caption: string;
  };
}

export type WritingCriterionKey =
  | "taskResponse"
  | "coherenceCohesion"
  | "lexicalResource"
  | "grammaticalRange";

export interface CriterionScore {
  key: WritingCriterionKey;
  band: BandScore;
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

export type CorrectionCategory = "grammar" | "vocabulary" | "spelling" | "punctuation" | "coherence";

export interface InlineCorrection {
  id: string;
  original: string;
  suggestion: string;
  explanation: string;
  category: CorrectionCategory;
}

export interface WritingSubmission {
  taskId: string;
  text: string;
  wordCount: number;
  timeSpentSeconds: number;
  submittedAt: string;
}

export interface WritingFeedback {
  submissionId: string;
  taskType: WritingTaskType;
  overallBand: BandScore;
  criteria: CriterionScore[];
  corrections: InlineCorrection[];
  /** Exactly three actionable tips. */
  tips: [string, string, string];
}

// ---------- Reading ----------

export type TfngAnswer = "true" | "false" | "not_given";

interface QuestionBase {
  id: string;
  number: number;
  prompt: string;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  kind: "multiple_choice";
  options: { id: string; label: string }[];
  correctOptionId: string;
}

export interface TfngQuestion extends QuestionBase {
  kind: "tfng";
  correctAnswer: TfngAnswer;
}

export type ReadingQuestion = MultipleChoiceQuestion | TfngQuestion;

export interface ReadingPassage {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface ReadingTest {
  id: string;
  title: string;
  /** One-line topic summary for the test list. */
  summary: string;
  timeLimitMinutes: number;
  passage: ReadingPassage;
  questions: ReadingQuestion[];
}

/** questionId -> chosen option id or TFNG value. */
export type ReadingAnswers = Record<string, string>;

export interface ReadingResult {
  testId: string;
  correct: number;
  total: number;
  band: BandScore;
  answers: ReadingAnswers;
  timeSpentSeconds: number;
  finishedAt: string;
}

// ---------- Dashboard ----------

export interface SkillScore {
  skill: Skill;
  band: BandScore;
  /** Change since previous attempt, e.g. +0.5 */
  delta: number;
}

export interface ScoreHistoryPoint {
  date: string;
  listening: BandScore;
  reading: BandScore;
  writing: BandScore;
  speaking: BandScore;
}

export type WeakAreaSeverity = "low" | "medium" | "high";

export interface WeakArea {
  id: string;
  skill: Skill;
  title: string;
  description: string;
  severity: WeakAreaSeverity;
}

export interface DashboardData {
  studentName: string;
  targetBand: BandScore;
  overallBand: BandScore;
  skills: SkillScore[];
  history: ScoreHistoryPoint[];
  weakAreas: WeakArea[];
}

// ---------- Marketing ----------

export interface WaitlistEntry {
  email: string;
  targetBand?: BandScore;
  createdAt: string;
}
