import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import type { TranslationKey } from "../../../i18n/translations";
import { colors, spacing, typography } from "../../../theme/design";
import type { Category } from "../homeContent";
import { DeckCategoryCard } from "./DeckCategoryCard";

const translatableDeckIds = new Set(["a2-focus", "b1-focus", "saved", "core", "all", "daily", "extended", "travel", "work", "health", "verbs", "forms", "custom", "numbers"]);

type Props = {
  categories: Category[];
  selectedDeckId: string;
  currentDeckCount: number;
  onSelectCategory: (category: string) => void;
};

export function DeckGrid({ categories, selectedDeckId, currentDeckCount, onSelectCategory }: Props) {
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
          const title = translatableDeckIds.has(category.id) ? t(`deck.${category.id}` as TranslationKey) : category.title;
          return <DeckCategoryCard key={category.id} category={category} selected={selected} title={title} onSelect={onSelectCategory} />;
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
