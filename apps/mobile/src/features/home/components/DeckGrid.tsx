import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing, typography } from "../../../theme/design";
import { DeckCategoryCard } from "./DeckCategoryCard";
import type { DeckGridProps } from "./deckGridTypes";
import { getDeckTitle } from "./deckTitle";

export function DeckGrid({ categories, selectedDeckId, currentDeckCount, wide, onSelectCategory }: DeckGridProps) {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.categoriesSection}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { textAlign }]}>{t("home.exploreDecks")}</Text>
        <Text style={[styles.sectionMeta, { textAlign }]}>{t("common.inCurrentDeck", { count: currentDeckCount })}</Text>
      </View>
      <View style={styles.categoryGrid}>
        {categories.map((category) => {
          const selected = selectedDeckId === category.id;
          const title = getDeckTitle(category, t);
          return <DeckCategoryCard key={category.id} category={category} selected={selected} title={title} wide={wide} onSelect={onSelectCategory} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.lgPlus },
  sectionTitle: { color: colors.charcoalText, fontSize: typography.title, fontWeight: typography.weightBold },
  sectionMeta: { color: colors.mutedSlate, fontSize: typography.label, fontWeight: typography.weightMedium },
  categoriesSection: { gap: spacing.lgPlus, marginHorizontal: spacing.page },
  categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.lgPlus }
});
