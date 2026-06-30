import type { Card } from "@czech-flashcards/shared";
import type { StudyCardActionProps, StudyCardMeaningProps, StudyCardMotionProps, StudyCardStateProps } from "./studyCardPropTypes";

export type StudyCardProps = StudyCardStateProps & StudyCardMotionProps & StudyCardMeaningProps & StudyCardActionProps & {
  current: Card | null;
};
