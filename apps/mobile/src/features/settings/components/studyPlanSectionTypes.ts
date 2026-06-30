import type { StudySettings } from "../../../database";

export type StudyPlanSectionProps = {
  settings: StudySettings;
  activeDeckLabel: string;
  onUpdate: (settings: Partial<StudySettings>) => void;
  onExamLevelChange: (examLevel: StudySettings["examLevel"]) => void;
};
