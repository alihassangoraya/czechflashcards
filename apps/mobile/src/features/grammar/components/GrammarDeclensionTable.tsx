import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { declensionRows } from "../models/grammarGuideTables";

export function GrammarDeclensionTable() {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <Text style={[styles.caseHeader, { textAlign }]}>{t("grammar.case")}</Text>
        <Text style={styles.header}>{t("grammar.masculineShort")}</Text>
        <Text style={styles.header}>{t("grammar.feminineShort")}</Text>
        <Text style={styles.header}>{t("grammar.neuterShort")}</Text>
      </View>
      {declensionRows.map((row) => (
        <View key={row.caseKey} style={styles.row}>
          <Text style={[styles.caseName, { textAlign }]}>{t(row.caseKey)}</Text>
          <Text style={styles.cell}>{row.masculine}</Text>
          <Text style={styles.cell}>{row.feminine}</Text>
          <Text style={styles.cell}>{row.neuter}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: { gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.lg },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  caseHeader: { width: size.grammarCaseColumnWidth, color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightBold, textTransform: "uppercase" },
  header: { flex: 1, color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightBold, textAlign: "center", textTransform: "uppercase" },
  caseName: { width: size.grammarCaseColumnWidth, color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  cell: { flex: 1, color: colors.textExample, fontSize: typography.bodySmall, fontWeight: typography.weightRegular, textAlign: "center" }
});
