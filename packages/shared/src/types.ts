export type CardLevel = "a2" | "b1";
export type MeaningLanguage = "hi" | "ur";
export type ReviewGrade = "again" | "hard" | "good" | "easy";

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

export interface ReviewState {
  cardId: string;
  knownStreak: number;
  againCount: number;
  dueAt: number;
  seen: number;
}

export interface ReviewEvent {
  cardId: string;
  grade: ReviewGrade;
  reviewedAt: number;
  wasNew: boolean;
  nextDueAt: number;
}

export interface DailyProgress {
  date: string;
  reviewed: number;
  newCards: number;
  goal: number;
  completed: boolean;
}

export interface NotificationPreferences {
  dailyReminderEnabled: boolean;
  dailyReminderTime: string;
  streakRiskEnabled: boolean;
  reviewDueEnabled: boolean;
}
