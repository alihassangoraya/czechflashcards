import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import MaterialIcons from "../../components/MaterialIcons";
import { useI18n } from "../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../theme/design";
import { RelatedWords } from "./components/RelatedWords";

export function WordDetailsPanel({ card }: { card: Card }) {
  const { t, textAlign } = useI18n();
  const hasRelatedWords = Boolean(card.synonyms || card.antonyms);
  if (!hasRelatedWords && !card.grammar && !card.googleCategory) return null;

  const grammarTitle = [
    card.grammar?.partOfSpeech,
    card.grammar?.reflexive ? t("details.reflexive") : ""
  ].filter(Boolean).join(" · ");

  return (
    <View style={styles.wordDetails}>
      <View style={styles.wordDetailsHeader}>
        <View style={styles.wordDetailsTitleRow}>
          <View style={styles.iconTile}>
            <MaterialIcons name="auto-stories" size={size.iconSmall} color={colors.primaryDeep} />
          </View>
          <Text style={[styles.wordDetailsTitle, { textAlign }]}>{t("details.title")}</Text>
        </View>
        {card.googleCategory && (
          <View style={styles.categoryPill}>
            <Text style={styles.wordDetailsCategory}>{t("details.category", { category: card.googleCategory })}</Text>
          </View>
        )}
      </View>
      {card.grammar && (
        <View style={styles.grammarDetail}>
          <Text style={[styles.detailLabel, { textAlign }]}>{t("details.grammar")}</Text>
          {Boolean(grammarTitle) && <Text style={[styles.grammarDetailTitle, { textAlign }]}>{grammarTitle}</Text>}
          {Boolean(card.grammar.note) && <Text style={[styles.grammarDetailText, { textAlign }]}>{card.grammar.note}</Text>}
        </View>
      )}
      {card.synonyms && <RelatedWords label={t("details.related")} icon="compare-arrows" value={card.synonyms} color={colors.success} />}
      {card.antonyms && <RelatedWords label={t("details.opposites")} icon="swap-horiz" value={card.antonyms} color={colors.danger} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wordDetails: { gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xl },
  wordDetailsHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md, flexWrap: "wrap" },
  wordDetailsTitleRow: { flex: 1, minWidth: 0, flexDirection: "row", alignItems: "center", gap: spacing.smd },
  iconTile: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.primarySoft },
  wordDetailsTitle: { flex: 1, color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  categoryPill: { borderRadius: radius.xl, backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.borderSoft, paddingHorizontal: spacing.md, paddingVertical: spacing.xxs },
  wordDetailsCategory: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium },
  grammarDetail: { gap: spacing.xs, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.lg },
  detailLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  grammarDetailTitle: { color: colors.primaryDeep, fontSize: typography.body, fontWeight: typography.weightSemibold },
  grammarDetailText: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge + spacing.xs }
});
