import type { Card } from "@czech-flashcards/shared";
import { env } from "../env";

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent";

export type GeminiTutorResult = {
  lesson: string;
  phonetics: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

function extractText(payload: GeminiResponse, fallback: string): string {
  return payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n").trim() || fallback;
}

async function generateGeminiText(prompt: string, fallback: string): Promise<string> {
  if (!env.geminiApiKey) {
    return "Gemini tutor is not configured for this build. Add EXPO_PUBLIC_GEMINI_API_KEY to enable online tutoring; offline study still works.";
  }

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(env.geminiApiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) {
    return `Gemini tutor is unavailable right now (${response.status}). Try again later.`;
  }

  return extractText(await response.json(), fallback);
}

export async function explainCzechCard(card: Card): Promise<GeminiTutorResult> {
  const lessonPrompt = `
You are an expert, supportive B1 Czech language tutor.
Create a compact, structured lesson for the Czech word "${card.cz}".

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

  const phoneticPrompt = `
Provide a practical pronunciation guide for the Czech word "${card.cz}".

Structure:
1. Phonetic spelling for an English speaker.
2. Mouth/tongue mechanics for any difficult Czech sounds in the word, such as ř, ž, š, č, ch, ď, ť, ň, or long vowels.
3. A short stress/rhythm tip. Czech stress is on the first syllable.

Keep this short and highly practical.
`.trim();

  const [lesson, phonetics] = await Promise.all([
    generateGeminiText(lessonPrompt, "Tutor notes could not be generated."),
    generateGeminiText(phoneticPrompt, "Pronunciation notes could not be generated.")
  ]);

  return { lesson, phonetics };
}
