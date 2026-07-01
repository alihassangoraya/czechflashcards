import { displaySelectedMeaning } from "../models/studyMeaning";
import type { StudyCardProps } from "./studyCardTypes";
import type { StudyContentCardProps } from "./studyContentCardTypes";

export function buildStudyCardProps(input: StudyContentCardProps): StudyCardProps {
  const { current, settings, ...cardProps } = input;

  return {
    ...cardProps,
    current,
    currentSecondaryMeaning: current ? displaySelectedMeaning(current, settings.appLanguage) : "",
    meaningLanguage: settings.appLanguage,
  };
}
