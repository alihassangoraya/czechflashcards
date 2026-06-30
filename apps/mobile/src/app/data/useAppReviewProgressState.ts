import { useState } from "react";
import type { ReviewStates } from "../../database";

export function useAppReviewProgressState() {
  const [states, setStates] = useState<ReviewStates>({});
  const [dailyProgress, setDailyProgress] = useState("0 / 30");

  return { states, dailyProgress, setStates, setDailyProgress };
}
