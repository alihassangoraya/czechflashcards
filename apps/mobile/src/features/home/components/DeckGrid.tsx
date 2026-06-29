import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { Category } from "../homeContent";

type Props = {
  categories: Category[];
  selectedDeckId: string;
  currentDeckCount: number;
  onSelectCategory: (category: string) => void;
};

export function DeckGrid({ categories, selectedDeckId, currentDeckCount, onSelectCategory }: Props) {
  return (
    <View style={styles.categoriesSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Explore Decks</Text>
        <Text style={styles.sectionMeta}>{currentDeckCount} in current deck</Text>
      </View>
      <View style={styles.categoryGrid}>
        {categories.map((category) => {
          const selected = selectedDeckId === category.id;
          return (
            <Pressable
              key={category.id}
              style={[styles.categoryCard, selected && styles.categoryCardSelected]}
              onPress={() => onSelectCategory(category.id)}
              accessibilityRole="button"
              accessibilityLabel={`Study ${category.title}`}
            >
              <View style={[styles.categoryIcon, { backgroundColor: `${category.color}1f` }]}>
                <MaterialIcons name={category.icon} size={22} color={category.color} />
              </View>
              <View style={styles.categoryCopy}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryCount}>{category.count || 0} cards</Text>
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
  sectionTitle: { color: colors.charcoalText, fontSize: 18, fontWeight: typography.weightBold },
  sectionMeta: { color: colors.mutedSlate, fontSize: 12, fontWeight: typography.weightMedium },
  categoriesSection: { gap: 10, marginHorizontal: 15 },
  categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  categoryCard: { width: "48%", minHeight: size.categoryCardHeight, flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radius.lg, borderWidth: spacing.hairline, borderColor: colors.lightSand, backgroundColor: colors.card, padding: spacing.md },
  categoryCardSelected: { borderColor: colors.softMint, borderWidth: spacing.xxs, padding: spacing.xs },
  categoryIcon: { width: size.categoryIcon, height: size.categoryIcon, alignItems: "center", justifyContent: "center", borderRadius: radius.md },
  categoryCopy: { flex: 1, gap: 2 },
  categoryTitle: { color: colors.charcoalText, fontSize: 15, fontWeight: typography.weightSemibold },
  categoryCount: { color: colors.mutedSlate, fontSize: 12, fontWeight: typography.weightRegular }
});
