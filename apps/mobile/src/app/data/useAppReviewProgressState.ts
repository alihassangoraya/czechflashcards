import { useState } from "react";
import type { DailyProgressLog, ReviewStates } from "../../database";

export function useAppReviewProgressState() {
  const [states, setStates] = useState<ReviewStates>({});
  const [dailyProgress, setDailyProgress] = useState("0 / 30");
  const [dailyProgressLog, setDailyProgressLog] = useState<DailyProgressLog>({});

  return { states, dailyProgress, dailyProgressLog, setStates, setDailyProgress, setDailyProgressLog };
}
