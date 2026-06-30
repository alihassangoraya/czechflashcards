import { useMemo } from "react";
import type { Card } from "@czech-flashcards/shared";
import { deriveQuizMetrics } from "./quizSessionMetrics";
import { buildQuestions } from "./quizQuestions";
import { useQuizAnswerState } from "./useQuizAnswerState";
import { useQuizRound } from "./useQuizRound";

export function useQuizSession(deck: Card[], onClose: () => void) {
  const { restartQuiz, round } = useQuizRound();
  const questions = useMemo(() => buildQuestions(deck), [deck, round]);
  const state = useQuizAnswerState(deck, round);
  const question = questions[state.index];
  const metrics = deriveQuizMetrics({ checked: state.checked, index: state.index, question, score: state.score, selected: state.selected });

  function requestClose() {
    if (metrics.hasProgress && !state.finished) {
      state.setShowExitConfirm(true);
      return;
    }
    onClose();
  }

  function confirmClose() {
    state.setShowExitConfirm(false);
    onClose();
  }

  function next() {
    if (!question) return;
    if (!state.checked) {
      if (state.selected == null) return;
      state.setChecked(true);
      if (state.selected === question.correctIndex) state.setScore((value) => value + 1);
      return;
    }
    if (state.index + 1 >= questions.length) {
      state.setFinished(true);
      return;
    }
    state.moveToNextQuestion();
  }

  return {
    questions,
    question,
    index: state.index,
    selected: state.selected,
    checked: state.checked,
    score: state.score,
    finished: state.finished,
    accuracy: metrics.accuracy,
    isCorrect: metrics.isCorrect,
    showExitConfirm: state.showExitConfirm,
    setSelected: state.setSelected,
    setShowExitConfirm: state.setShowExitConfirm,
    restartQuiz,
    requestClose,
    confirmClose,
    next
  };
}
