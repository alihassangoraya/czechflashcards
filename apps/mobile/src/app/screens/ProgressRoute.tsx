import React from "react";
import { ProgressDashboardScreen } from "../../features/progress";
import type { ProgressRouteProps } from "./routeTypes/progressRouteProps";

export function ProgressRoute({ cards, states, settings, dailyProgressLog, onSetScreen }: ProgressRouteProps) {
  return <ProgressDashboardScreen cards={cards} states={states} settings={settings} dailyProgressLog={dailyProgressLog} onBack={() => onSetScreen("home")} />;
}
