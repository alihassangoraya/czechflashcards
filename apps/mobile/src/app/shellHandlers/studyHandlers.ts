import type { AppShellHandlerInput } from "./handlerInput";
import type { StudyHandlerInput } from "./handlerTypes";

export function buildStudyHandlers({ studySession }: StudyHandlerInput) {
  return {
    onUndoLastReview: () => { void studySession.undoLastReview(); },
    onGrade: (result: Parameters<AppShellHandlerInput["studySession"]["grade"]>[0]) => { void studySession.grade(result); }
  };
}
