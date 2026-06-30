import type { Card } from "@czech-flashcards/shared";
import { generateGeminiText } from "./geminiClient";
import type { GeminiTutorResult } from "./geminiTypes";
import { buildTutorLessonPrompt, buildTutorPhoneticPrompt } from "./tutorPrompts";

export type { GeminiTutorResult } from "./geminiTypes";

export async function explainCzechCard(card: Card): Promise<GeminiTutorResult> {
  const [lesson, phonetics] = await Promise.all([
    generateGeminiText(buildTutorLessonPrompt(card), "Tutor notes could not be generated."),
    generateGeminiText(buildTutorPhoneticPrompt(card), "Pronunciation notes could not be generated.")
  ]);

  return { lesson, phonetics };
}
