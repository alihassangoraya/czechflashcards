import type { QuizAnswerState } from "./useQuizAnswerState";

type Params = {
  hasProgress: boolean;
  onClose: () => void;
  state: QuizAnswerState;
};

export function useQuizCloseActions({ hasProgress, onClose, state }: Params) {
  function requestClose() {
    if (hasProgress && !state.finished) {
      state.setShowExitConfirm(true);
      return;
    }
    onClose();
  }

  function confirmClose() {
    state.setShowExitConfirm(false);
    onClose();
  }

  return { confirmClose, requestClose };
}
