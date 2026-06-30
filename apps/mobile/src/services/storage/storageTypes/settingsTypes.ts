import type { NotificationPreferences } from "@czech-flashcards/shared";
import type { ThemeMode } from "../../../theme/design";

export type CustomDeck = { id: string; name: string };

export type StudySettings = {
  examLevel: "a2" | "b1";
  deckFilter: string;
  meaningLanguage: "hi" | "ur";
  appLanguage: "en" | "cs" | "hi" | "ur";
  themeMode: ThemeMode;
  dailyGoal: number;
  customDecks: CustomDeck[];
  notifications: NotificationPreferences;
};
