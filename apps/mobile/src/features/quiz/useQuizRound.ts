import { useState } from "react";

export function useQuizRound() {
  const [round, setRound] = useState(0);
  return { restartQuiz: () => setRound((value) => value + 1), round };
}
