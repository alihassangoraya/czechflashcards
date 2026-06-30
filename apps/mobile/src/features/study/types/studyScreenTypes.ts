import type { StudyContentCardProps } from "../components/studyContentCardTypes";
import type { StudyProgressProps } from "../components/StudyProgress";
import type { StudyRevealedContentProps } from "../components/StudyRevealedContent";

type StudyHeaderProps = {
  onBack: () => void;
  onOpenGrammar: () => void;
};

export type StudyContentProps = StudyContentCardProps & {
  reviewInterval: StudyRevealedContentProps["reviewInterval"];
  onGrade: StudyRevealedContentProps["onGrade"];
};

export type StudyScreenProps = StudyHeaderProps & StudyProgressProps & StudyContentProps;
