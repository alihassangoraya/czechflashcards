import type { Card } from "@czech-flashcards/shared";
import { generateGeminiText } from "./geminiClient";
import type { GeminiTutorResult } from "./geminiTypes";
import { buildTutorLessonPrompt, buildTutorPhoneticPrompt } from "./tutorPrompts";

export type { GeminiTutorResult } from "./geminiTypes";

export async function explainCzechCard(card: Card, language: string): Promise<GeminiTutorResult> {
  const [lesson, phonetics] = await Promise.all([
    generateGeminiText(buildTutorLessonPrompt(card, language), "Tutor notes could not be generated."),
    generateGeminiText(buildTutorPhoneticPrompt(card, language), "Pronunciation notes could not be generated.")
  ]);

  return { lesson, phonetics };
}
