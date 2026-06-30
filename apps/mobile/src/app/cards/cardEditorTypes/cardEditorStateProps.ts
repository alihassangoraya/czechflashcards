import type { Card } from "@czech-flashcards/shared";
import type { Panel } from "../../appTypes";

export type CardEditorStateProps = {
  setCurrent: (card: Card | null) => void;
  setRevealed: (revealed: boolean) => void;
  setPanel: (panel: Panel | null) => void;
  setSessionReviews: (updater: number | ((value: number) => number)) => void;
};
