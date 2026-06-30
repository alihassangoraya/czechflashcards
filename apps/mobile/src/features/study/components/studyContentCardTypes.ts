import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";
import type { StudyCardActionProps, StudyCardMotionProps, StudyCardStateProps } from "./studyCardPropTypes";

export type StudyContentCardProps = StudyCardStateProps & StudyCardMotionProps & StudyCardActionProps & {
  current: Card | null;
  settings: StudySettings;
};
