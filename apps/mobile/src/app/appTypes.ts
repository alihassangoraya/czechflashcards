import type { Card, ReviewEvent, ReviewState } from "@czech-flashcards/shared";
import type { RelearningEntry } from "../features/study/studyQueue";

export type Panel = "search" | "add" | "edit" | "settings" | "account" | "grammar";
export type Screen = "home" | "study" | "quiz";
export type UndoReview = {
  card: Card;
  previousState: ReviewState;
  event: ReviewEvent;
  previousRelearningQueue: RelearningEntry[];
};
