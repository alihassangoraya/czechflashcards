import type {
  MainAccountDataProps,
  MainAuthHandlers,
  MainDeckDataProps,
  MainNavigationHandlers,
  MainRouteStateProps,
  MainStudyDataProps,
  MainStudyHandlers
} from "./screenTypes/index";
import type { StudyAnimations } from "../studyAnimationTypes";
export type { StudyAnimations };

export type MainScreenProps =
  MainRouteStateProps &
  MainDeckDataProps &
  MainStudyDataProps &
  MainAccountDataProps &
  MainNavigationHandlers &
  MainStudyHandlers &
  MainAuthHandlers;
