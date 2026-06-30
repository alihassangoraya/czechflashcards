import type { Card, ReviewState } from "@czech-flashcards/shared";
import type { TranslationKey } from "../../i18n/translations";
import { buildShuffledDueQueue } from "./dueShuffleQueue";

type Input = {
  deck: Card[];
  states: Record<string, ReviewState>;
  current: Card | null;
  translate: (key: TranslationKey, values?: Record<string, string | number>) => string;
};

export function buildDueShuffleNotice({ deck, states, current, translate }: Input) {
  const due = deck.filter((card) => (states[card.id]?.dueAt || 0) <= Date.now());
  return {
    queue: buildShuffledDueQueue(due, current),
    notice: due.length
      ? translate("settings.notice.shuffledDue", { count: due.length })
      : translate("settings.notice.noDueToShuffle")
  };
}
