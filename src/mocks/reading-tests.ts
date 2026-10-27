import type { ReadingQuestion, ReadingTest } from "@/types/ielts";

/**
 * Original single-passage Reading mocks written for IELTS.ai — not taken
 * from official materials. Questions 1–5 are TFNG, 6–10 multiple choice.
 */

const tfng = (n: number, prompt: string, correctAnswer: "true" | "false" | "not_given"): ReadingQuestion => ({
  id: `q${n}`,
  number: n,
  kind: "tfng",
  prompt,
  correctAnswer,
});

const mc = (n: number, prompt: string, options: [string, string, string, string], correct: "A" | "B" | "C" | "D"): ReadingQuestion => ({
  id: `q${n}`,
  number: n,
  kind: "multiple_choice",
  prompt,
  options: options.map((label, i) => ({ id: "ABCD"[i], label })),
  correctOptionId: correct,
});

export const readingTests: ReadingTest[] = [
  {
    id: "vertical-farming",
    title: "Growing Food Indoors",
    summary: "Vertical farming: technology, water use and economics",
    timeLimitMinutes: 20,
    passage: {
      id: "p-vertical-farming",
      title: "The Quiet Rise of Vertical Farming",
      paragraphs: [
        "In the past decade, a growing number of entrepreneurs have begun growing vegetables indoors, in stacked layers under artificial light. Supporters describe vertical farming as a way to produce fresh food close to where people live, cutting the distance that lettuce or herbs must travel from field to plate. Critics, however, argue that the energy needed to replace sunlight makes the approach expensive and, in some regions, less environmentally friendly than traditional agriculture.",
        "The basic technology is not new. Greenhouses have used supplementary lighting for decades, and hydroponics — growing plants in nutrient-rich water rather than soil — was studied by scientists as early as the 1930s. What has changed is the cost of light-emitting diodes. LED lamps now use a fraction of the electricity of older sodium lamps and can be tuned to the specific wavelengths that plants absorb most efficiently.",
        "Water use is where vertical farms perform most impressively. Because water in a closed system is captured and recirculated, many operators report using up to 95 per cent less water than open fields growing the same crop. This makes the method particularly attractive in dry countries, where agriculture competes with cities for limited supplies.",
        "Yet the range of crops that can be grown profitably remains narrow. Leafy greens and herbs grow quickly, are light and sell at a high price per kilogram. Staple crops such as wheat or rice, by contrast, need a long growing season and large amounts of light, and would cost many times more to produce indoors than on a conventional farm. For this reason, few experts expect vertical farms to replace fields; instead, they see them as a supplement for particular products.",
        "The future of the industry may depend less on engineering than on electricity prices. Several well-funded companies closed in recent years when energy costs rose sharply. Those that survived often share one feature: access to cheap renewable power, sometimes generated on their own rooftops. If clean electricity becomes cheaper and more widely available, researchers suggest, the economic argument for growing food indoors could become considerably stronger.",
      ],
    },
    questions: [
      tfng(1, "Hydroponics was first investigated in the twenty-first century.", "false"),
      tfng(2, "Modern LED lamps consume less electricity than sodium lamps.", "true"),
      tfng(3, "Vertical farms are more common in dry countries than anywhere else.", "not_given"),
      tfng(4, "Growing rice indoors is currently cheaper than growing it on a conventional farm.", "false"),
      tfng(5, "Most vertical farming companies are owned by technology firms.", "not_given"),
      mc(6, "According to the first paragraph, critics of vertical farming are mainly concerned about", ["the distance food travels", "the energy required", "the taste of the vegetables", "the number of new companies"], "B"),
      mc(7, "What has recently made vertical farming more practical?", ["new types of soil", "government subsidies", "cheaper LED lighting", "larger greenhouses"], "C"),
      mc(8, "Vertical farms save water mainly because", ["water is reused within a closed system", "indoor crops need less water", "rainwater is collected on rooftops", "only herbs are grown"], "A"),
      mc(9, "Why are leafy greens well suited to vertical farms?", ["They need very little light.", "They can be grown without water.", "They are staple foods.", "They grow quickly and sell at a high price."], "D"),
      mc(10, "What do the surviving vertical farming companies often have in common?", ["They grow wheat as well as greens.", "They are located in city centres.", "They have access to cheap renewable energy.", "They received the most investment."], "C"),
    ],
  },
  {
    id: "earworms",
    title: "Why Songs Get Stuck",
    summary: "Earworms: what makes a tune ‘sticky’ and why we replay music",
    timeLimitMinutes: 20,
    passage: {
      id: "p-earworms",
      title: "The Science of Earworms",
      paragraphs: [
        "Almost everyone has experienced it: a short fragment of a song repeats in the mind for hours, sometimes long after the music has stopped. Psychologists call this phenomenon an ‘earworm’, and surveys suggest that most people experience one at least once a week. Although earworms are usually harmless, they offer researchers a useful window into how the brain stores and retrieves musical information.",
        "Not every song is equally likely to become an earworm. Studies comparing large numbers of popular tunes have found that the most ‘sticky’ songs tend to have a fairly fast tempo and a simple, easy-to-sing melody. At the same time, they often contain one small surprise — an unusual jump between notes or an unexpected rhythm — that makes them stand out from similar songs.",
        "Circumstances matter too. Earworms are more likely when a person has heard a song recently or repeatedly, and they often appear during low-demand activities such as walking, showering or waiting in a queue. Stress and tiredness also seem to increase their frequency, although researchers are still debating why.",
        "People try many strategies to get rid of an unwanted tune. Some deliberately listen to the whole song, on the theory that the brain repeats an incomplete fragment because it ‘wants’ to finish it. Others turn to a moderately difficult task, such as a puzzle or an anagram. One small study found that chewing gum reduced the number of times participants ‘heard’ a tune in their heads, possibly because it interferes with the subtle movements involved in silently singing.",
        "Far from being merely annoying, the ability to replay music internally may once have been useful. Before writing and recording existed, songs were one of the main ways communities passed on stories, rules and knowledge. A memory system that easily held on to rhythm and melody would have helped people preserve this information across generations.",
      ],
    },
    questions: [
      tfng(1, "Surveys indicate that most people experience an earworm every week.", "true"),
      tfng(2, "Slow songs are more likely to become earworms than fast ones.", "false"),
      tfng(3, "Earworms occur more often in women than in men.", "not_given"),
      tfng(4, "Scientists agree on why stress makes earworms more frequent.", "false"),
      tfng(5, "Listening to the complete song always stops an earworm.", "not_given"),
      mc(6, "Researchers are interested in earworms because they", ["are a sign of stress", "show how the brain stores and retrieves music", "help people learn languages", "are becoming more common"], "B"),
      mc(7, "A typical ‘sticky’ song has", ["a slow tempo and complex lyrics", "a long instrumental introduction", "a simple melody with one unexpected element", "many sudden changes of rhythm"], "C"),
      mc(8, "Earworms most often appear when people are", ["doing undemanding activities", "concentrating hard at work", "listening to unfamiliar music", "talking with friends"], "A"),
      mc(9, "According to the passage, chewing gum may help because it", ["distracts people with its flavour", "makes people feel less tired", "reduces stress levels", "interferes with silent singing movements"], "D"),
      mc(10, "The writer suggests that the ability to replay songs", ["may once have helped communities preserve knowledge", "developed only after music was recorded", "is stronger in musicians than in others", "has no practical purpose"], "A"),
    ],
  },
];

export function getReadingTest(id: string): ReadingTest | undefined {
  return readingTests.find((test) => test.id === id);
}
