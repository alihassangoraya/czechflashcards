import React from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import type { Card, ReviewState } from "@czech-flashcards/shared";
import type { MaterialIconName } from "../../../components/MaterialIcons";
import type { StudySettings } from "../../../database";
import { useI18n } from "../../../i18n/I18nProvider";
import type { TranslationKey } from "../../../i18n/translations";
import { colors, spacing, typography } from "../../../theme/design";
import { DailyGoalCard } from "../components/DailyGoalCard";
import { DeckGrid } from "../components/DeckGrid";
import { HomeHero } from "../components/HomeHero";
import { StudyGuide } from "../components/StudyGuide";
import { baseDecks, countForDeck, type Category } from "../homeContent";
import { deckLabel } from "../../settings/settingsFormat";

type Props = {
  deck: Card[];
  allCards: Card[];
  states: Record<string, ReviewState>;
  settings: StudySettings;
  savedCount: number;
  customCount: number;
  dailyProgress: string;
  accountEmail: string | null;
  syncStatus: string;
  onStartStudy: () => void;
  onStartQuiz: () => void;
  onSelectCategory: (category: string) => void;
  onSearch: () => void;
  onAdd: () => void;
  onSettings: () => void;
  onAccount: () => void;
};

export function HomeScreen({
  deck,
  allCards,
  states,
  settings,
  savedCount,
  customCount,
  dailyProgress,
  accountEmail,
  syncStatus,
  onStartStudy,
  onStartQuiz,
  onSelectCategory,
  onSearch,
  onAdd,
  onSettings,
  onAccount
}: Props) {
  const { t } = useI18n();
  const { width } = useWindowDimensions();
  const isWideLayout = width >= 768;
  const now = Date.now();
  const dueCount = deck.filter((card) => (states[card.id]?.dueAt || 0) <= now).length;
  const [reviewedToday, goalToday] = dailyProgress.split(" / ").map((value) => Number.parseInt(value, 10) || 0);
  const dailyGoal = goalToday || settings.dailyGoal;
  const dailyRatio = dailyGoal ? Math.min(1, reviewedToday / dailyGoal) : 0;
  const visibleCards = allCards.filter((card) => settings.examLevel === "b1" || card.level === "a2" || card.tags.includes("custom") || String(card.id).startsWith("import-"));
  const categories: Category[] = [
    ...baseDecks.map((category) => ({ ...category, count: countForDeck(category.id, visibleCards, savedCount, customCount) })),
    ...settings.customDecks.map((customDeck, index) => ({
      id: customDeck.id,
      title: customDeck.name,
      icon: "folder" as MaterialIconName,
      color: index % 2 ? colors.bohemianBlue : colors.softMint,
      count: visibleCards.filter((card) => card.tags.includes(customDeck.id)).length
    }))
  ];
  const activeDeckLabel = settings.customDecks.some((deck) => deck.id === settings.deckFilter)
    ? deckLabel(settings.deckFilter, settings.customDecks)
    : t(`deck.${settings.deckFilter}` as TranslationKey);

  return (
    <View style={styles.screen}>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <HomeHero
        activeDeckLabel={activeDeckLabel}
        examLevel={settings.examLevel}
        dueCount={dueCount}
        accountEmail={accountEmail}
        wide={isWideLayout}
        onStartStudy={onStartStudy}
        onStartQuiz={onStartQuiz}
        onSearch={onSearch}
        onAdd={onAdd}
        onSettings={onSettings}
        onAccount={onAccount}
      />
      <DailyGoalCard reviewedToday={reviewedToday} dailyGoal={dailyGoal} ratio={dailyRatio} />
      <DeckGrid categories={categories} selectedDeckId={settings.deckFilter} currentDeckCount={deck.length} onSelectCategory={onSelectCategory} />
      <StudyGuide />
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 },
  content: { gap: typography.bodyLarge, paddingBottom: spacing.screenBottom }
});
