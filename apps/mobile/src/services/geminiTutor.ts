import type { Card } from "@czech-flashcards/shared";
import { generateGeminiText } from "./gemini/geminiClient";
import type { GeminiTutorResult } from "./gemini/geminiTypes";
import { buildTutorLessonPrompt, buildTutorPhoneticPrompt } from "./gemini/tutorPrompts";

export type { GeminiTutorResult } from "./gemini/geminiTypes";

export async function explainCzechCard(card: Card): Promise<GeminiTutorResult> {
  const [lesson, phonetics] = await Promise.all([
    generateGeminiText(buildTutorLessonPrompt(card), "Tutor notes could not be generated."),
    generateGeminiText(buildTutorPhoneticPrompt(card), "Pronunciation notes could not be generated.")
  ]);

  return { lesson, phonetics };
}
