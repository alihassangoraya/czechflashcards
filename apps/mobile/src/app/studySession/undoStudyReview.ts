import type { AppDatabase, StudySettings } from "../../database";
import { restoreReview } from "./reviewPersistence";
import type { UndoReview } from "./reviewTypes";

type UndoInput = {
  db: AppDatabase | null;
  settings: StudySettings | null;
  lastReview: UndoReview | null;
  grading: boolean;
  setGrading: (value: boolean) => void;
  onBeforeRestore: (review: UndoReview) => void;
  onRestored: () => void;
  refresh: (database?: AppDatabase | null) => Promise<void>;
};

export async function undoStudyReview(input: UndoInput): Promise<void> {
  if (!input.db || !input.settings || !input.lastReview || input.grading) return;
  input.setGrading(true);
  try {
    input.onBeforeRestore(input.lastReview);
    await restoreReview(input.db, input.lastReview, input.settings.dailyGoal);
    await input.refresh(input.db);
    input.onRestored();
  } finally {
    input.setGrading(false);
  }
}
