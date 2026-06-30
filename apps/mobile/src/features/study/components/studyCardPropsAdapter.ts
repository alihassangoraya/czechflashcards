import { displaySelectedMeaning } from "../studyMeaning";
import type { StudyCardProps } from "./studyCardTypes";
import type { StudyContentCardProps } from "./studyContentCardTypes";

export function buildStudyCardProps({
  current,
  settings,
  savedCardIds,
  revealed,
  flipping,
  grading,
  swipeDirection,
  lastReviewCard,
  dragX,
  flipProgress,
  cardRotation,
  panHandlers,
  onFlipCard,
  onToggleSaved,
  onManageDecks,
  onEditCard,
  onCompleteSwipe,
  onUndoLastReview
}: StudyContentCardProps): StudyCardProps {
  return {
    current,
    currentSecondaryMeaning: current ? displaySelectedMeaning(current, settings.meaningLanguage) : "",
    savedCardIds,
    revealed,
    flipping,
    grading,
    swipeDirection,
    lastReviewCard,
    dragX,
    flipProgress,
    cardRotation,
    panHandlers,
    meaningLanguage: settings.meaningLanguage,
    onFlipCard,
    onToggleSaved,
    onManageDecks,
    onEditCard,
    onCompleteSwipe,
    onUndoLastReview
  };
}
