import type { ReviewGrade } from "@czech-flashcards/shared";
import type { SwipeDirection } from "./animationTypes";
import { swipeConfig } from "./swipeConfig";

export function directionFromDrag(dx: number, threshold: number): SwipeDirection | null {
  if (dx > threshold) return "known";
  if (dx < -threshold) return "again";
  return null;
}

export function gradeFromSwipe(direction: SwipeDirection): ReviewGrade {
  return direction === "known" ? "good" : "again";
}

export function shouldCaptureHorizontalSwipe(dx: number, dy: number): boolean {
  return Math.abs(dx) > swipeConfig.activationDistance && Math.abs(dx) > Math.abs(dy);
}

export function swipeCompletionOffset(direction: SwipeDirection): number {
  return direction === "known" ? swipeConfig.completionOffset : -swipeConfig.completionOffset;
}
