import type { Card, ReviewGrade } from "@czech-flashcards/shared";
import type { AppDatabase, StudySettings } from "../../database";
import type { RelearningEntry } from "../../features/study";
import type { UndoReview } from "./reviewTypes";
import { restoreReview, saveGradedReview } from "./reviewPersistence";

type GradeInput = {
  db: AppDatabase | null;
  settings: StudySettings | null;
  card: Card | null;
  grade: ReviewGrade;
  grading: boolean;
  previousRelearningQueue: RelearningEntry[];
  setGrading: (value: boolean) => void;
  onReviewed: (review: UndoReview, cardId: string, grade: ReviewGrade) => void;
  refresh: (database?: AppDatabase | null) => Promise<void>;
};

export async function gradeStudyCard(input: GradeInput): Promise<void> {
  if (!input.db || !input.settings || !input.card || input.grading) return;
  input.setGrading(true);
  try {
    const review = await saveGradedReview({
      db: input.db,
      card: input.card,
      grade: input.grade,
      dailyGoal: input.settings.dailyGoal,
      previousRelearningQueue: input.previousRelearningQueue
    });
    input.onReviewed(review, input.card.id, input.grade);
    await input.refresh(input.db);
  } finally {
    input.setGrading(false);
  }
}

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
