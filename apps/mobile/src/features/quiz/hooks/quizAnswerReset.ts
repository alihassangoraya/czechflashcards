export type QuizAnswerResetters = {
  setIndex: (value: number) => void;
  setSelected: (value: number | null) => void;
  setChecked: (value: boolean) => void;
  setScore: (value: number) => void;
  setFinished: (value: boolean) => void;
  setShowExitConfirm: (value: boolean) => void;
};

export function resetQuizAnswerState(resetters: QuizAnswerResetters) {
  resetters.setIndex(0);
  resetters.setSelected(null);
  resetters.setChecked(false);
  resetters.setScore(0);
  resetters.setFinished(false);
  resetters.setShowExitConfirm(false);
}
