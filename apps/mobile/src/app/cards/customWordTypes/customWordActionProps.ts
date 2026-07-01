import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase } from "../../../database";

export type CustomWordActionProps = {
  db: AppDatabase | null;
  cards: Card[];
  refresh: (database?: AppDatabase | null) => Promise<void>;
  showToast: (message: string) => void;
};
