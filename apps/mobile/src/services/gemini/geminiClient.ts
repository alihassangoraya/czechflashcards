import { env } from "../config/env";
import type { GeminiResponse } from "./geminiTypes";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MISSING_KEY_MESSAGE = "Gemini tutor is not configured for this build. Add EXPO_PUBLIC_GEMINI_API_KEY, VITE_GEMINI_API_KEY, GEMINI_API_KEY, GOOGLE_API_KEY, or GOOGLE_GENERATIVE_AI_API_KEY to enable online tutoring; offline study still works.";

function extractText(payload: GeminiResponse, fallback: string): string {
  return payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n").trim() || fallback;
}

export async function generateGeminiText(prompt: string, fallback: string): Promise<string> {
  if (!env.geminiApiKey) return MISSING_KEY_MESSAGE;

  const endpoint = `${GEMINI_BASE_URL}/${encodeURIComponent(env.geminiModel)}:generateContent`;
  const response = await fetch(`${endpoint}?key=${encodeURIComponent(env.geminiApiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) return `Gemini tutor is unavailable right now (${response.status}). Try again later.`;

  return extractText(await response.json(), fallback);
}
