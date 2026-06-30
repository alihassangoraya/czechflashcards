import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";

export function GrammarVerbGuide() {
  const { t } = useI18n();

  return (
    <>
      <Text style={styles.heading}>{t("grammar.presentTense")}</Text>
      <Text style={styles.copy}>{t("grammar.verbCopy")}</Text>
      <View style={styles.table}>
        <Text style={styles.tableText}>{t("grammar.subjectsSingular")}</Text>
        <Text style={styles.tableText}>{t("grammar.subjectsPlural")}</Text>
      </View>
      <Text style={styles.copy}>{t("grammar.aspectCopy")}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  heading: { color: colors.primaryDeep, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold, marginTop: spacing.xxs },
  copy: { color: colors.textSoft, fontSize: typography.body, lineHeight: typography.bodyLarge + spacing.mdPlus, fontWeight: typography.weightRegular },
  table: { gap: spacing.md, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  tableText: { color: colors.textExample, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge + spacing.xs, fontWeight: typography.weightRegular }
});
