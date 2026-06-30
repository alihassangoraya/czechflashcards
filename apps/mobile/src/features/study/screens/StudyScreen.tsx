import React from "react";
import {
  Animated,
  GestureResponderHandlers,
  ScrollView,
  StyleSheet,
} from "react-native";
import type { Card, ReviewGrade } from "@czech-flashcards/shared";
import { GeminiTutorPanel } from "../../tutor";
import type { StudySettings } from "../../../database";
import { spacing } from "../../../theme/design";
import { ReviewButtons } from "../components/ReviewButtons";
import { StudyCard } from "../components/StudyCard";
import { StudyHeader } from "../components/StudyHeader";
import { StudyProgress } from "../components/StudyProgress";
import { displaySelectedMeaning } from "../studyMeaning";
import { WordDetailsPanel } from "../WordDetailsPanel";

type SwipeDirection = "again" | "known";

type Props = {
  current: Card | null;
  settings: StudySettings;
  savedCardIds: Set<string>;
  revealed: boolean;
  flipping: boolean;
  grading: boolean;
  swipeDirection: SwipeDirection | null;
  lastReviewCard: Card | null;
  sessionReviews: number;
  sessionTarget: number;
  reviewedToday: number;
  dailyGoal: number;
  sessionProgress: number;
  dragX: Animated.Value;
  flipProgress: Animated.Value;
  cardRotation: Animated.AnimatedInterpolation<string | number>;
  panHandlers: GestureResponderHandlers;
  reviewInterval: (grade: ReviewGrade) => string;
  onBack: () => void;
  onOpenGrammar: () => void;
  onFlipCard: () => void;
  onToggleSaved: (cardId: string) => void;
  onManageDecks: (card: Card) => void;
  onEditCard: () => void;
  onCompleteSwipe: (direction: SwipeDirection) => void;
  onUndoLastReview: () => void;
  onGrade: (grade: ReviewGrade) => void;
};

export function StudyScreen({
  current,
  settings,
  savedCardIds,
  revealed,
  flipping,
  grading,
  swipeDirection,
  lastReviewCard,
  sessionReviews,
  sessionTarget,
  reviewedToday,
  dailyGoal,
  sessionProgress,
  dragX,
  flipProgress,
  cardRotation,
  panHandlers,
  reviewInterval,
  onBack,
  onOpenGrammar,
  onFlipCard,
  onToggleSaved,
  onManageDecks,
  onEditCard,
  onCompleteSwipe,
  onUndoLastReview,
  onGrade
}: Props) {
  const currentSecondaryMeaning = current ? displaySelectedMeaning(current, settings.meaningLanguage) : "";

  return (
    <>
      <StudyHeader onBack={onBack} onOpenGrammar={onOpenGrammar} />
      <StudyProgress sessionReviews={sessionReviews} sessionTarget={sessionTarget} reviewedToday={reviewedToday} dailyGoal={dailyGoal} sessionProgress={sessionProgress} />

      <ScrollView contentContainerStyle={styles.content} directionalLockEnabled>
        <StudyCard
          current={current}
          currentSecondaryMeaning={currentSecondaryMeaning}
          savedCardIds={savedCardIds}
          revealed={revealed}
          flipping={flipping}
          grading={grading}
          swipeDirection={swipeDirection}
          lastReviewCard={lastReviewCard}
          dragX={dragX}
          flipProgress={flipProgress}
          cardRotation={cardRotation}
          panHandlers={panHandlers}
          meaningLanguage={settings.meaningLanguage}
          onFlipCard={onFlipCard}
          onToggleSaved={onToggleSaved}
          onManageDecks={onManageDecks}
          onEditCard={onEditCard}
          onCompleteSwipe={onCompleteSwipe}
          onUndoLastReview={onUndoLastReview}
        />

        {revealed && current && <ReviewButtons grading={grading} reviewInterval={reviewInterval} onGrade={onGrade} />}

        {revealed && current && <WordDetailsPanel card={current} />}
        {revealed && <GeminiTutorPanel card={current} />}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingBottom: spacing.screenBottom }
});
