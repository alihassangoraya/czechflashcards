import type { SwipeDirection } from "../animations/animationTypes";

export type StudySwipeActionsProps = {
  grading: boolean;
  onCompleteSwipe: (direction: SwipeDirection) => void;
};
