import type { Animated } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudyCardActionProps, StudyCardMeaningProps } from "./studyCardPropTypes";

export type StudyCardFacesProps = StudyCardMeaningProps & StudyCardActionProps & {
  current: Card;
  flipProgress: Animated.Value;
  flipping: boolean;
  grading: boolean;
  isSaved: boolean;
  lastReviewCard: Card | null;
  revealed: boolean;
};
