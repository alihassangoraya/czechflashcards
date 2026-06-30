import type { AppShellHandlerInput } from "./handlerInput";

type Input = Pick<AppShellHandlerInput, "studySession">;

export function buildStudyHandlers({ studySession }: Input) {
  return {
    onUndoLastReview: () => { void studySession.undoLastReview(); },
    onGrade: (result: Parameters<AppShellHandlerInput["studySession"]["grade"]>[0]) => { void studySession.grade(result); }
  };
}
