import type { Card, ReviewEvent, ReviewState } from "@czech-flashcards/shared";
import type { RelearningEntry } from "../features/study/studyQueue";

export type Panel = "search" | "add" | "edit" | "settings" | "account" | "grammar" | "deck";
export type Screen = "home" | "study" | "quiz" | "login" | "register";
export type UndoReview = {
  card: Card;
  previousState: ReviewState;
  event: ReviewEvent;
  previousRelearningQueue: RelearningEntry[];
};
