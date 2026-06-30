import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase } from "../../../database";
import type { Panel } from "../../appTypes";

export type CardEditorDataProps = {
  db: AppDatabase | null;
  current: Card | null;
  panel: Panel | null;
};
