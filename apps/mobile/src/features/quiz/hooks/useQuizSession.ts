import { useMemo } from "react";
import type { Card } from "@czech-flashcards/shared";
import { buildQuestions } from "../models/quizQuestions";
import { deriveQuizMetrics } from "../models/quizSessionMetrics";
import { useQuizAnswerState } from "./useQuizAnswerState";
import { useQuizCloseActions } from "./useQuizCloseActions";
import { useQuizNextAction } from "./useQuizNextAction";
import { useQuizRound } from "./useQuizRound";

export function useQuizSession(deck: Card[], onClose: () => void) {
  const { restartQuiz, round } = useQuizRound();
  const questions = useMemo(() => buildQuestions(deck), [deck, round]);
  const state = useQuizAnswerState(deck, round);
  const question = questions[state.index];
  const metrics = deriveQuizMetrics({ checked: state.checked, index: state.index, question, score: state.score, selected: state.selected });
  const { confirmClose, requestClose } = useQuizCloseActions({ hasProgress: metrics.hasProgress, onClose, state });
  const next = useQuizNextAction({ question, questionCount: questions.length, state });

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

export type QuizSession = ReturnType<typeof useQuizSession>;
