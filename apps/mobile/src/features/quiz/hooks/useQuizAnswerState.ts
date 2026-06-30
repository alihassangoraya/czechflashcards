import { useEffect, useState } from "react";
import type { Card } from "@czech-flashcards/shared";
import { resetQuizAnswerState } from "./quizAnswerReset";

export function useQuizAnswerState(deck: Card[], round: number) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    resetQuizAnswerState({ setIndex, setSelected, setChecked, setScore, setFinished, setShowExitConfirm });
  }, [deck, round]);

  function moveToNextQuestion() {
    setIndex((value) => value + 1);
    setSelected(null);
    setChecked(false);
  }

  return {
    checked,
    finished,
    index,
    moveToNextQuestion,
    score,
    selected,
    setChecked,
    setFinished,
    setScore,
    setSelected,
    setShowExitConfirm,
    showExitConfirm
  };
}
