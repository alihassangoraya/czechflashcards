export type ReviewGrade = "again" | "hard" | "good" | "easy";

export interface ReviewState {
  cardId: string;
  knownStreak: number;
  againCount: number;
  dueAt: number;
  seen: number;
}

export interface ReviewEvent {
  cardId: string;
  grade: ReviewGrade;
  reviewedAt: number;
  wasNew: boolean;
  nextDueAt: number;
}
