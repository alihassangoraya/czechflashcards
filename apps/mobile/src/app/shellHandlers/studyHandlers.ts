import type { AppShellHandlerInput } from "./handlerInput";
import type { StudyHandlerInput } from "./handlerTypes";

export function buildStudyHandlers({ studySession, showToast, t }: StudyHandlerInput) {
  return {
    onUndoLastReview: () => { void studySession.undoLastReview().then((ok) => ok && showToast(t("toast.reviewUndone"))); },
    onGrade: (result: Parameters<AppShellHandlerInput["studySession"]["grade"]>[0]) => { void studySession.grade(result); }
  };
}
