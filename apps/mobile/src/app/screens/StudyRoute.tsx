import React from "react";
import { StudyScreen } from "../../features/study";
import type { StudyRouteProps } from "./routeTypes";

export function StudyRoute({ current, settings, savedCardIds, revealed, grading, lastReviewCard, sessionReviews, sessionTarget, reviewedToday, dailyGoal, sessionProgress, studyAnimations, reviewInterval, onSetScreen, onSetPanel, onToggleSaved, onSetDeckManagementCard, onOpenCardEditor, onUndoLastReview, onGrade }: StudyRouteProps) {
  return (
    <StudyScreen
      current={current}
      settings={settings}
      savedCardIds={savedCardIds}
      revealed={revealed}
      flipping={studyAnimations.flipping}
      grading={grading}
      swipeDirection={studyAnimations.swipeDirection}
      lastReviewCard={lastReviewCard}
      sessionReviews={sessionReviews}
      sessionTarget={sessionTarget}
      reviewedToday={reviewedToday}
      dailyGoal={dailyGoal}
      sessionProgress={sessionProgress}
      dragX={studyAnimations.dragX}
      flipProgress={studyAnimations.flipProgress}
      cardRotation={studyAnimations.cardRotation}
      panHandlers={studyAnimations.panHandlers}
      reviewInterval={reviewInterval}
      onBack={() => onSetScreen("home")}
      onOpenGrammar={() => onSetPanel("grammar")}
      onFlipCard={studyAnimations.flipCard}
      onToggleSaved={(cardId) => onToggleSaved(cardId, true)}
      onManageDecks={onSetDeckManagementCard}
      onEditCard={() => onOpenCardEditor()}
      onCompleteSwipe={studyAnimations.completeSwipe}
      onUndoLastReview={onUndoLastReview}
      onGrade={onGrade}
    />
  );
}
