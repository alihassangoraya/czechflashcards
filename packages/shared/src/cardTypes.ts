export type CardLevel = "a2" | "b1";
export type MeaningLanguage = "en" | "cs" | "hi" | "ur" | "uk";

export interface GrammarDetails {
  partOfSpeech: string;
  reflexive: boolean;
  note: string;
  aspect?: "perfective" | "imperfective" | string;
}

export interface Card {
  id: string;
  cz: string;
  en: string;
  cs: string;
  hi: string;
  ur: string;
  uk: string;
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
