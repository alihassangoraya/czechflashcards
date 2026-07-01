import type { StudyAnimations } from "../../study/studyTypes/studyAnimationTypes";
import type { MainAccountDataProps } from "./mainAccountDataProps";
import type { MainAuthHandlers } from "./mainAuthHandlers";
import type { MainDeckDataProps } from "./mainDeckDataProps";
import type { MainNavigationHandlers } from "./mainNavigationHandlers";
import type { MainRouteStateProps } from "./mainRouteStateProps";
import type { MainSettingsHandlers } from "./mainSettingsHandlers";
import type { MainStudyDataProps } from "./mainStudyDataProps";
import type { MainStudyHandlers } from "./mainStudyHandlers";

export type { StudyAnimations };

export type MainScreenProps =
  MainRouteStateProps &
  MainDeckDataProps &
  MainStudyDataProps &
  MainAccountDataProps &
  MainNavigationHandlers &
  MainStudyHandlers &
  MainAuthHandlers &
  MainSettingsHandlers;
