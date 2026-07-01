import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing, typography } from "../../../theme/design";
import { DailyGoalCard } from "./DailyGoalCard";
import { DeckGrid } from "./DeckGrid";
import { StudyGuide } from "./StudyGuide";
import type { HomeContentProps } from "./homeContentTypes";

export function HomeContent({ deck, settings, model, wide, onSelectCategory }: HomeContentProps) {
  return (
    <View style={styles.content}>
      <DailyGoalCard reviewedToday={model.dailyGoalProgress.reviewedToday} dailyGoal={model.dailyGoalProgress.dailyGoal} ratio={model.dailyGoalProgress.dailyRatio} />
      <DeckGrid categories={model.categories} selectedDeckId={settings.deckFilter} currentDeckCount={deck.length} wide={wide} onSelectCategory={onSelectCategory} />
      <StudyGuide />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { gap: typography.bodyLarge, paddingBottom: spacing.screenBottom }
});
