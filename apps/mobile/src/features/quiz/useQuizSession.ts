import { useEffect, useMemo, useState } from "react";
import type { Card } from "@czech-flashcards/shared";
import { buildQuestions } from "./quizQuestions";

export function useQuizSession(deck: Card[], onClose: () => void) {
  const [round, setRound] = useState(0);
  const questions = useMemo(() => buildQuestions(deck), [deck, round]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
    setShowExitConfirm(false);
  }, [deck, round]);

  const question = questions[index];
  const answeredCount = index + (checked ? 1 : 0);
  const accuracy = answeredCount ? Math.round((score / answeredCount) * 100) : 0;
  const hasProgress = index > 0 || selected !== null || checked || score > 0;
  const isCorrect = Boolean(question && selected === question.correctIndex);

  function restartQuiz() {
    setRound((value) => value + 1);
  }

  function requestClose() {
    if (hasProgress && !finished) {
      setShowExitConfirm(true);
      return;
    }
    onClose();
  }

  function confirmClose() {
    setShowExitConfirm(false);
    onClose();
  }

  function next() {
    if (!question) return;
    if (!checked) {
      if (selected == null) return;
      setChecked(true);
      if (selected === question.correctIndex) setScore((value) => value + 1);
      return;
    }
    if (index + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setChecked(false);
  }

  return {
    questions,
    question,
    index,
    selected,
    checked,
    score,
    finished,
    accuracy,
    isCorrect,
    showExitConfirm,
    setSelected,
    setShowExitConfirm,
    restartQuiz,
    requestClose,
    confirmClose,
    next
  };
}
