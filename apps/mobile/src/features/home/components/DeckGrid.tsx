import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import type { TranslationKey } from "../../../i18n/translations";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { Category } from "../homeContent";

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
          return (
            <Pressable
              key={category.id}
              style={[styles.categoryCard, selected && styles.categoryCardSelected]}
              onPress={() => onSelectCategory(category.id)}
              accessibilityRole="button"
              accessibilityLabel={t("home.studyDeck", { title })}
            >
              <View style={[styles.categoryIcon, { backgroundColor: `${category.color}1f` }]}>
                <MaterialIcons name={category.icon} size={22} color={category.color} />
              </View>
              <View style={styles.categoryCopy}>
                <Text style={[styles.categoryTitle, { textAlign }]}>{title}</Text>
                <Text style={[styles.categoryCount, { textAlign }]}>{category.count || 0} {t("common.cards")}</Text>
              </View>
              {selected && <MaterialIcons name="check-circle" size={17} color={colors.softMint} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 },
  sectionTitle: { color: colors.charcoalText, fontSize: typography.title, fontWeight: typography.weightBold },
  sectionMeta: { color: colors.mutedSlate, fontSize: typography.label, fontWeight: typography.weightMedium },
  categoriesSection: { gap: 10, marginHorizontal: 15 },
  categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  categoryCard: { width: "48%", minHeight: size.categoryCardHeight, flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radius.lg, borderWidth: spacing.hairline, borderColor: colors.lightSand, backgroundColor: colors.card, padding: spacing.md },
  categoryCardSelected: { borderColor: colors.softMint, borderWidth: spacing.xxs, padding: spacing.xs },
  categoryIcon: { width: size.categoryIcon, height: size.categoryIcon, alignItems: "center", justifyContent: "center", borderRadius: radius.md },
  categoryCopy: { flex: 1, gap: 2 },
  categoryTitle: { color: colors.charcoalText, fontSize: typography.categoryTitle, fontWeight: typography.weightSemibold },
  categoryCount: { color: colors.mutedSlate, fontSize: typography.label, fontWeight: typography.weightRegular }
});
