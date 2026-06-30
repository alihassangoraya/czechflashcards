export type QuizResultSummaryProps = {
  score: number;
  total: number;
  missed: number;
  accuracy: number;
  feedback: string;
  textAlign: "auto" | "left" | "right" | "center" | "justify";
  labels: {
    score: string;
    correct: string;
    missed: string;
    accuracy: string;
  };
};
