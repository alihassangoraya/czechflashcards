import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = {
  grammar: NonNullable<Card["grammar"]>;
};

export function GrammarDetailCard({ grammar }: Props) {
  const { t, textAlign } = useI18n();
  const title = [
    grammar.partOfSpeech,
    grammar.aspect,
    grammar.reflexive ? t("details.reflexive") : ""
  ].filter(Boolean).join(" · ");

  return (
    <View style={styles.card}>
      <Text style={[styles.label, { textAlign }]}>{t("details.grammar")}</Text>
      {Boolean(title) && <Text style={[styles.title, { textAlign }]}>{title}</Text>}
      {Boolean(grammar.note) && <Text style={[styles.text, { textAlign }]}>{grammar.note}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.xs, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.lg },
  label: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  title: { color: colors.primaryDeep, fontSize: typography.body, fontWeight: typography.weightSemibold },
  text: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge + spacing.xs }
});
