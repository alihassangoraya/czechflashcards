import type { Question } from "../quizQuestions";
import type { QuizAnswerState } from "./useQuizAnswerState";

type Params = {
  question: Question | undefined;
  questionCount: number;
  state: QuizAnswerState;
};

export function useQuizNextAction({ question, questionCount, state }: Params) {
  return function next() {
    if (!question) return;
    if (!state.checked) {
      if (state.selected == null) return;
      state.setChecked(true);
      if (state.selected === question.correctIndex) state.setScore((value) => value + 1);
      return;
    }
    if (state.index + 1 >= questionCount) {
      state.setFinished(true);
      return;
    }
    state.moveToNextQuestion();
  };
}
