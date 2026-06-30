import React from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import type { Card, ReviewState } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";
import { useI18n } from "../../../i18n/I18nProvider";
import { spacing, typography } from "../../../theme/design";
import { DailyGoalCard } from "../components/DailyGoalCard";
import { DeckGrid } from "../components/DeckGrid";
import { HomeHero } from "../components/HomeHero";
import { StudyGuide } from "../components/StudyGuide";
import { buildHomeScreenModel } from "../homeScreenModel";

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
  const { activeDeckLabel, categories, dailyGoalProgress, dueCount } = buildHomeScreenModel({
    deck,
    allCards,
    states,
    settings,
    savedCount,
    customCount,
    dailyProgress,
    translate: t
  });

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
      <DailyGoalCard reviewedToday={dailyGoalProgress.reviewedToday} dailyGoal={dailyGoalProgress.dailyGoal} ratio={dailyGoalProgress.dailyRatio} />
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
