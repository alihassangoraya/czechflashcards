import type { Animated } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudyCardActionProps, StudyCardMeaningProps, StudyCardStateProps } from "./studyCardPropTypes";

export type CurrentStudyCardProps = StudyCardStateProps & StudyCardMeaningProps & StudyCardActionProps & {
  current: Card;
  flipProgress: Animated.Value;
};
