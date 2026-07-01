import type { NotificationPreferences } from "@czech-flashcards/shared";
import type { ThemePreference } from "../../../theme/design";

export type CustomDeck = { id: string; name: string };

export type StudySettings = {
  examLevel: "a2" | "b1";
  deckFilter: string;
  meaningLanguage: "en" | "cs" | "hi" | "ur" | "uk";
  appLanguage: "en" | "cs" | "hi" | "ur" | "uk";
  themeMode: ThemePreference;
  dailyGoal: number;
  customDecks: CustomDeck[];
  notifications: NotificationPreferences;
};
