import type { Card } from "@czech-flashcards/shared";
import type { ReviewStates, StudySettings } from "../../../database";

export type HomeScreenProps = {
  deck: Card[];
  allCards: Card[];
  states: ReviewStates;
  settings: StudySettings;
  savedCount: number;
  customCount: number;
  dailyProgress: string;
  accountEmail: string | null;
  syncStatus: string;
  onStartStudy: () => void;
  onStartQuiz: () => void;
  onOpenProgress: () => void;
  onSelectCategory: (category: string) => void;
  onSearch: () => void;
  onAdd: () => void;
  onSettings: () => void;
  onAccount: () => void;
};
