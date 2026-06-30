import React from "react";
import { StudyContent } from "../components/StudyContent";
import { StudyHeader } from "../components/StudyHeader";
import { StudyProgress } from "../components/StudyProgress";
import type { StudyScreenProps } from "../studyScreenTypes";

export function StudyScreen({
  sessionReviews,
  sessionTarget,
  reviewedToday,
  dailyGoal,
  sessionProgress,
  onBack,
  onOpenGrammar,
  ...contentProps
}: StudyScreenProps) {
  return (
    <>
      <StudyHeader onBack={onBack} onOpenGrammar={onOpenGrammar} />
      <StudyProgress sessionReviews={sessionReviews} sessionTarget={sessionTarget} reviewedToday={reviewedToday} dailyGoal={dailyGoal} sessionProgress={sessionProgress} />
      <StudyContent {...contentProps} />
    </>
  );
}
