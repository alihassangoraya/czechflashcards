import React from "react";
import type { Card, ReviewGrade } from "@czech-flashcards/shared";
import { GeminiTutorPanel } from "../../tutor";
import { ReviewButtons } from "./ReviewButtons";
import { WordDetailsPanel } from "./WordDetailsPanel";

type Props = {
  current: Card | null;
  grading: boolean;
  revealed: boolean;
  reviewInterval: (grade: ReviewGrade) => string;
  onGrade: (grade: ReviewGrade) => void;
};

export function StudyRevealedContent({ current, grading, revealed, reviewInterval, onGrade }: Props) {
  if (!revealed) return null;

  return (
    <>
      {current && <ReviewButtons grading={grading} reviewInterval={reviewInterval} onGrade={onGrade} />}
      {current && <WordDetailsPanel card={current} />}
      <GeminiTutorPanel card={current} />
    </>
  );
}
