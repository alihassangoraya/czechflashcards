import React from "react";
import { QuizScreen } from "../../features/quiz";
import type { MainScreenProps } from "./screenTypes";

type Props = Pick<MainScreenProps, "deck" | "onSetScreen">;

export function QuizRoute({ deck, onSetScreen }: Props) {
  return <QuizScreen deck={deck} onClose={() => onSetScreen("home")} />;
}
