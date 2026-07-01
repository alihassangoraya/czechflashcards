import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";
import { generatePresentConjugation } from "../models/grammarGuideTables";

type Props = {
  word: string;
};

export function GrammarConjugationTable({ word }: Props) {
  const { t, textAlign } = useI18n();
  const forms = generatePresentConjugation(word);
  const singular = forms.slice(0, 3);
  const plural = forms.slice(3);

  return (
    <View style={styles.table}>
      <View style={styles.column}>
        <Text style={[styles.columnTitle, { textAlign }]}>{t("grammar.singular")}</Text>
        {singular.map((form) => <Text key={form} style={[styles.form, { textAlign }]}>{form}</Text>)}
      </View>
      <View style={styles.column}>
        <Text style={[styles.columnTitle, { textAlign }]}>{t("grammar.plural")}</Text>
        {plural.map((form) => <Text key={form} style={[styles.form, { textAlign }]}>{form}</Text>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  table: { flexDirection: "row", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  column: { flex: 1, gap: spacing.xs, minWidth: 0 },
  columnTitle: { color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  form: { color: colors.textExample, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge + spacing.xs, fontWeight: typography.weightRegular }
});
