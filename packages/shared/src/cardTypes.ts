export type CardLevel = "a2" | "b1";
export type MeaningLanguage = "hi" | "ur";

export interface GrammarDetails {
  partOfSpeech: string;
  reflexive: boolean;
  note: string;
}

export interface Card {
  id: string;
  cz: string;
  en: string;
  hi: string;
  ur: string;
  sentence: string;
  sentenceEn: string;
  level: CardLevel;
  tags: string[];
  source: "seed" | "legacy-web" | "custom" | "import";
  pronunciation?: string;
  synonyms?: string;
  antonyms?: string;
  grammar?: GrammarDetails;
  googleCategory?: string;
}
