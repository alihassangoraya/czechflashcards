import React from "react";
import { QuizScreen } from "../../features/quiz";
import type { QuizRouteProps } from "./routeTypes";

export function QuizRoute({ deck, settings, onGoBack }: QuizRouteProps) {
  return <QuizScreen deck={deck} language={settings.appLanguage} onClose={onGoBack} />;
}
