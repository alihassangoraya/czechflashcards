import { ProgressDashboardScreen } from "../../features/progress";
import type { ProgressRouteProps } from "./routeTypes/progressRouteProps";

export function ProgressRoute({ cards, states, settings, dailyProgressLog, onStartStudy, onGoBack, onSetScreen, onShuffleDue, onReviewAllNow }: ProgressRouteProps) {
  const shuffleAndStudy = () => {
    if (onShuffleDue()) onStartStudy();
  };
  const reviewAllAndStudy = async () => {
    if (await onReviewAllNow()) onStartStudy();
  };
  return <ProgressDashboardScreen cards={cards} states={states} settings={settings} dailyProgressLog={dailyProgressLog} onBack={onGoBack} onStartStudy={onStartStudy} onOpenSettings={() => onSetScreen("settings")} onShuffleDue={shuffleAndStudy} onReviewAllNow={() => void reviewAllAndStudy()} />;
}
