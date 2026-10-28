import type { AppLocale } from "@/i18n/routing";
import type { DashboardData, WeakArea } from "@/types/ielts";

/**
 * Demo student profile for the dashboard. Weak-area copy is per locale
 * because, unlike AI feedback, it is product UI the student reads first.
 */

type WeakAreaCopy = Pick<WeakArea, "title" | "description">;

const weakAreaCopy: Record<string, Record<AppLocale, WeakAreaCopy>> = {
  "reading-not-given": {
    uz: {
      title: "FALSE va NOT GIVEN ni farqlash",
      description: "Oxirgi 3 testda NOT GIVEN savollarining 60% iga FALSE deb javob bergansiz.",
    },
    en: {
      title: "Telling FALSE from NOT GIVEN",
      description: "In your last 3 tests you answered FALSE to 60% of NOT GIVEN questions.",
    },
  },
  "writing-linkers": {
    uz: {
      title: "Bogʻlovchilarning bir xilligi",
      description: "Insholaringizda “however” va “also” juda koʻp takrorlanadi — Coherence balini pasaytiradi.",
    },
    en: {
      title: "Repetitive linking words",
      description: "“However” and “also” appear too often in your essays, lowering Coherence.",
    },
  },
  "speaking-fluency": {
    uz: {
      title: "Speaking: ravonlik",
      description: "Part 2 da uzoq pauzalar bor. 2 daqiqa toʻxtamasdan gapirishni mashq qiling.",
    },
    en: {
      title: "Speaking fluency",
      description: "Long pauses in Part 2. Practise speaking for two minutes without stopping.",
    },
  },
  "listening-maps": {
    uz: {
      title: "Listening: xarita savollari",
      description: "Section 2 dagi xarita va reja savollarida natija oʻrtachadan past.",
    },
    en: {
      title: "Listening: map labelling",
      description: "Map and plan questions in Section 2 are below your average.",
    },
  },
};

const weakAreaMeta: Omit<WeakArea, "title" | "description">[] = [
  { id: "reading-not-given", skill: "reading", severity: "high" },
  { id: "writing-linkers", skill: "writing", severity: "high" },
  { id: "speaking-fluency", skill: "speaking", severity: "medium" },
  { id: "listening-maps", skill: "listening", severity: "low" },
];

export function getDashboardData(locale: AppLocale): DashboardData {
  return {
    studentName: "Sardor",
    targetBand: 7,
    overallBand: 6.5,
    skills: [
      { skill: "listening", band: 7, delta: 0.5 },
      { skill: "reading", band: 6.5, delta: 0.5 },
      { skill: "writing", band: 6, delta: 0 },
      { skill: "speaking", band: 6, delta: 0.5 },
    ],
    history: [
      { date: "2026-05-15", listening: 5.5, reading: 5.5, writing: 5, speaking: 5 },
      { date: "2026-06-15", listening: 6, reading: 5.5, writing: 5.5, speaking: 5 },
      { date: "2026-07-15", listening: 6, reading: 6, writing: 5.5, speaking: 5.5 },
      { date: "2026-08-15", listening: 6.5, reading: 6, writing: 6, speaking: 5.5 },
      { date: "2026-09-15", listening: 6.5, reading: 6, writing: 6, speaking: 5.5 },
      { date: "2026-10-15", listening: 7, reading: 6.5, writing: 6, speaking: 6 },
    ],
    weakAreas: weakAreaMeta.map((meta) => ({ ...meta, ...weakAreaCopy[meta.id][locale] })),
  };
}
