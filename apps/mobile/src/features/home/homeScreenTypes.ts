import type { Card, ReviewState } from "@czech-flashcards/shared";
import type { StudySettings } from "../../database";

export type HomeScreenProps = {
  deck: Card[];
  allCards: Card[];
  states: Record<string, ReviewState>;
  settings: StudySettings;
  savedCount: number;
  customCount: number;
  dailyProgress: string;
  accountEmail: string | null;
  syncStatus: string;
  onStartStudy: () => void;
  onStartQuiz: () => void;
  onSelectCategory: (category: string) => void;
  onSearch: () => void;
  onAdd: () => void;
  onSettings: () => void;
  onAccount: () => void;
};
