import React from "react";
import type { Card } from "@czech-flashcards/shared";
import { QuizActiveScreen } from "../components/QuizActiveScreen";
import { QuizEmptyState } from "../components/QuizEmptyState";
import { QuizResultScreen } from "../components/QuizResultScreen";
import { useQuizSession } from "../hooks/useQuizSession";

type Props = {
  deck: Card[];
  onClose: () => void;
};

export function QuizScreen({ deck, onClose }: Props) {
  const quiz = useQuizSession(deck, onClose);

  if (quiz.questions.length === 0) {
    return <QuizEmptyState onClose={onClose} />;
  }

  if (quiz.finished) {
    return <QuizResultScreen score={quiz.score} total={quiz.questions.length} onRestart={quiz.restartQuiz} onClose={onClose} />;
  }

  return <QuizActiveScreen quiz={quiz} />;
}
