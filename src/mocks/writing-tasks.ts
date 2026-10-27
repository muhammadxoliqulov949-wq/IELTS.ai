import type { WritingTask } from "@/types/ielts";

/** Original practice prompts written for IELTS.ai — not taken from official materials. */
export const writingTasks: WritingTask[] = [
  {
    id: "t1-commuting-bar",
    type: "task1",
    title: "Commuting habits in four cities",
    prompt:
      "The bar chart below shows the percentage of working adults in four cities who commuted by public transport, bicycle and private car in 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    minWords: 150,
    timeLimitMinutes: 20,
    visual: {
      kind: "bar",
      caption: "Commuting method by city, 2024 (% of working adults)",
    },
  },
  {
    id: "t1-glass-process",
    type: "task1",
    title: "Recycling glass bottles",
    prompt:
      "The diagram below illustrates how used glass bottles are collected and turned into new containers. Summarise the information by selecting and reporting the main features.",
    minWords: 150,
    timeLimitMinutes: 20,
    visual: {
      kind: "process",
      caption: "From collection bin to new bottle: seven stages",
    },
  },
  {
    id: "t2-free-university",
    type: "task2",
    title: "Should university be free?",
    prompt:
      "Some people believe that university education should be free for every student, while others argue that students should pay at least part of the cost themselves. Discuss both views and give your own opinion.",
    minWords: 250,
    timeLimitMinutes: 40,
  },
  {
    id: "t2-remote-work",
    type: "task2",
    title: "Working from home",
    prompt:
      "In many countries, a growing number of people now work from home for some or all of the week. Do the advantages of this trend outweigh the disadvantages?",
    minWords: 250,
    timeLimitMinutes: 40,
  },
];

export function getWritingTask(id: string): WritingTask | undefined {
  return writingTasks.find((task) => task.id === id);
}
