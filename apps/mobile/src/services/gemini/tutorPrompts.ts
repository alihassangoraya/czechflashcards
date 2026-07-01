import type { Card } from "@czech-flashcards/shared";
import { tutorLanguageName } from "./tutorLanguage";

export function buildTutorLessonPrompt(card: Card, language: string): string {
  return `
You are an expert, supportive B1 Czech language tutor.
Create a compact, structured lesson for the Czech word "${card.cz}".
Write the explanation in ${tutorLanguageName(language)}.

Known card data:
- English: ${card.en}
- Hindi: ${card.hi}
- Urdu: ${card.ur}
- Example Czech: ${card.sentence || "not provided"}
- Example English: ${card.sentenceEn || "not provided"}

Structure the response:
1. Part of speech and grammar: identify noun gender, verb aspect, adjective/adverb behavior, or another useful B1 grammar note.
2. Usage tip: give one memorable, practical learner hint.
3. Three B1 practice sentences in Czech, each followed by English.

Keep it friendly, precise, and useful for a learner preparing for A2/B1 Czech. Avoid advanced academic jargon.
`.trim();
}

export function buildTutorPhoneticPrompt(card: Card, language: string): string {
  return `
Provide a practical pronunciation guide for the Czech word "${card.cz}".
Write the explanation in ${tutorLanguageName(language)}.

Structure:
1. Phonetic spelling for an English speaker.
2. Mouth/tongue mechanics for any difficult Czech sounds in the word, such as ř, ž, š, č, ch, ď, ť, ň, or long vowels.
3. A short stress/rhythm tip. Czech stress is on the first syllable.

Keep this short and highly practical.
`.trim();
}
