import type { Card } from "@czech-flashcards/shared";
import type { AppData } from "../data/useAppData";
import { buildAccountStudySummary } from "./studySummary";

type Input = {
  data: AppData;
  deck: Card[];
};

export function buildAccountSummaryProps({ data, deck }: Input) {
  if (!data.settings) throw new Error("Cannot build account summary before settings load");
  return {
    accountStudySummary: buildAccountStudySummary(deck, data.cards, data.states, data.savedCardIds.size, data.settings, data.syncStatus)
  };
}
