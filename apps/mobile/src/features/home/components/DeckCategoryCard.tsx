import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { DeckCategoryCardProps } from "./deckCategoryCardTypes";

export function DeckCategoryCard({ category, selected, title, onSelect }: DeckCategoryCardProps) {
  const { t, textAlign } = useI18n();

  return (
    <Pressable
      style={[styles.card, selected && styles.selected]}
      onPress={() => onSelect(category.id)}
      accessibilityRole="button"
      accessibilityLabel={t("home.studyDeck", { title })}
    >
      <View style={[styles.icon, { backgroundColor: `${category.color}1f` }]}>
        <MaterialIcons name={category.icon} size={size.iconMedium} color={category.color} />
      </View>
      <View style={styles.copy}>
        <Text style={[styles.title, { textAlign }]}>{title}</Text>
        <Text style={[styles.count, { textAlign }]}>{category.count || 0} {t("common.cards")}</Text>
      </View>
      {selected && <MaterialIcons name="check-circle" size={size.iconSmall} color={colors.softMint} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: "48%", minHeight: size.categoryCardHeight, flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radius.lg, borderWidth: spacing.hairline, borderColor: colors.lightSand, backgroundColor: colors.card, padding: spacing.md },
  selected: { borderColor: colors.softMint, borderWidth: spacing.xxs, padding: spacing.xs },
  icon: { width: size.categoryIcon, height: size.categoryIcon, alignItems: "center", justifyContent: "center", borderRadius: radius.md },
  copy: { flex: 1, gap: spacing.xxs },
  title: { color: colors.charcoalText, fontSize: typography.categoryTitle, fontWeight: typography.weightSemibold },
  count: { color: colors.mutedSlate, fontSize: typography.label, fontWeight: typography.weightRegular }
});
