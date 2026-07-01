import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";
import { GrammarDeclensionTable } from "./GrammarDeclensionTable";

type Props = {
  gender: string;
};

export function GrammarNounGuide({ gender }: Props) {
  const { t } = useI18n();

  return (
    <>
      <Text style={styles.heading}>{t("grammar.casesGender")}</Text>
      <Text style={styles.copy}>{t("grammar.caseCopy", { gender })}</Text>
      <Text style={styles.detected}>{t("grammar.detectedGender", { gender })}</Text>
      <GrammarDeclensionTable />
      <View style={styles.table}>
        <Text style={styles.tableText}>{t("grammar.caseNom")}</Text>
        <Text style={styles.tableText}>{t("grammar.caseGen")}</Text>
        <Text style={styles.tableText}>{t("grammar.caseAcc")}</Text>
        <Text style={styles.tableText}>{t("grammar.caseLoc")}</Text>
        <Text style={styles.tableText}>{t("grammar.caseIns")}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: { color: colors.primaryDeep, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold, marginTop: spacing.xxs },
  copy: { color: colors.textSoft, fontSize: typography.body, lineHeight: typography.bodyLarge + spacing.mdPlus, fontWeight: typography.weightRegular },
  detected: { color: colors.iconWarning, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  table: { gap: spacing.md, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  tableText: { color: colors.textExample, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge + spacing.xs, fontWeight: typography.weightRegular }
});
