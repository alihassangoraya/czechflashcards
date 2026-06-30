import type { Card } from "@czech-flashcards/shared";
import type { ReviewStates, StudySettings } from "../../../database";
import type { TranslationKey } from "../../../i18n/translations";
import { deckLabel } from "../../settings";
import { buildHomeCategories, filterVisibleHomeCards } from "./homeCategories";
import { parseHomeDailyProgress } from "./homeDailyProgress";

type Params = {
  deck: Card[];
  allCards: Card[];
  states: ReviewStates;
  settings: StudySettings;
  savedCount: number;
  customCount: number;
  dailyProgress: string;
  translate: (key: TranslationKey) => string;
};

export function buildHomeScreenModel({ deck, allCards, states, settings, savedCount, customCount, dailyProgress, translate }: Params) {
  const dueCount = countDueCards(deck, states);
  const dailyGoalProgress = parseHomeDailyProgress(dailyProgress, settings.dailyGoal);
  const visibleCards = filterVisibleHomeCards(allCards, settings.examLevel);
  const categories = buildHomeCategories(visibleCards, settings, savedCount, customCount);
  const activeDeckLabel = settings.customDecks.some((deckItem) => deckItem.id === settings.deckFilter)
    ? deckLabel(settings.deckFilter, settings.customDecks, translate)
    : translate(`deck.${settings.deckFilter}` as TranslationKey);

  return { activeDeckLabel, categories, dailyGoalProgress, dueCount };
}

export type HomeScreenModel = ReturnType<typeof buildHomeScreenModel>;

function countDueCards(deck: Card[], states: ReviewStates) {
  const now = Date.now();
  return deck.filter((card) => (states[card.id]?.dueAt || 0) <= now).length;
}
