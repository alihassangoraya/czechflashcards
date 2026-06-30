import { applyReviewGrade, type Card, type ReviewGrade } from "@czech-flashcards/shared";
import { getReviewState, saveReviewResult, undoReviewResult, type AppDatabase } from "../../database";
import type { UndoReview } from "./reviewTypes";

type SaveReviewInput = {
  db: AppDatabase;
  card: Card;
  grade: ReviewGrade;
  dailyGoal: number;
  previousRelearningQueue: UndoReview["previousRelearningQueue"];
};

export async function saveGradedReview({ db, card, grade, dailyGoal, previousRelearningQueue }: SaveReviewInput): Promise<UndoReview> {
  const previousState = await getReviewState(db, card.id);
  const next = applyReviewGrade(previousState, grade, Date.now());
  await saveReviewResult(db, next.state, next.event, dailyGoal);
  return { card, previousState, event: next.event, previousRelearningQueue };
}

export async function restoreReview(db: AppDatabase, review: UndoReview, dailyGoal: number) {
  await undoReviewResult(db, review.previousState, review.event, dailyGoal);
}
