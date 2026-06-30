import React from "react";
import { QuizScreen } from "../../features/quiz";
import type { QuizRouteProps } from "./routeTypes";

export function QuizRoute({ deck, onSetScreen }: QuizRouteProps) {
  return <QuizScreen deck={deck} onClose={() => onSetScreen("home")} />;
}
