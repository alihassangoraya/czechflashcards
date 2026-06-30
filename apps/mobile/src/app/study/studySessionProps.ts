import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase, ReviewStates, StudySettings } from "../../database";

export type StudySessionProps = {
  db: AppDatabase | null;
  settings: StudySettings | null;
  deck: Card[];
  states: ReviewStates;
  refresh: (database?: AppDatabase | null) => Promise<void>;
};
