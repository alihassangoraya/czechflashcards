import { useState } from "react";
import type { UndoReview } from "./reviewTypes";

export function useReviewSessionState() {
  const [lastReview, setLastReview] = useState<UndoReview | null>(null);
  const [grading, setGrading] = useState(false);
  const [sessionReviews, setSessionReviews] = useState(0);

  function recordReview(review: UndoReview) {
    setLastReview(review);
    setSessionReviews((value) => value + 1);
  }

  function clearLastReview() {
    setLastReview(null);
  }

  function decrementSessionReviews() {
    setSessionReviews((value) => Math.max(0, value - 1));
  }

  return {
    clearLastReview,
    decrementSessionReviews,
    grading,
    lastReview,
    recordReview,
    resetSessionReviews: () => setSessionReviews(0),
    sessionReviews,
    setGrading,
    setSessionReviews
  };
}

export type ReviewSessionState = ReturnType<typeof useReviewSessionState>;
