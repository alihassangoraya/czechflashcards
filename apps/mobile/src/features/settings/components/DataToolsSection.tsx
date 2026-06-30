import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { SettingsSection } from "./SettingsSection";
import { UtilityButton } from "./UtilityButton";
import type { DataToolsSectionProps } from "./dataToolsSectionTypes";

export function DataToolsSection({ notice, activeDeckLabel, onRestoreJson, onImportCsv, onShuffleDue, onReviewAllNow, onExportProgress, onExportDeck }: DataToolsSectionProps) {
  const { t, textAlign } = useI18n();

  return (
    <SettingsSection icon="assignment" title={t("settings.dataTools")} description={t("settings.dataToolsDescription")}>
      <View style={styles.utilityGrid}>
        <UtilityButton icon="refresh" title={t("settings.restoreJson")} detail={t("settings.restoreJsonDetail")} onPress={onRestoreJson} />
        <UtilityButton icon="library-add" title={t("settings.importCsv")} detail={t("settings.importCsvDetail", { deck: activeDeckLabel })} onPress={onImportCsv} />
        <UtilityButton icon="swap-horiz" title={t("settings.shuffleDue")} detail={t("settings.shuffleDueDetail")} onPress={onShuffleDue} />
        <UtilityButton icon="today" title={t("settings.reviewAllNow")} detail={t("settings.reviewAllNowDetail")} onPress={onReviewAllNow} />
        <UtilityButton icon="trending-up" title={t("settings.exportProgress")} detail={t("settings.exportProgressDetail")} onPress={onExportProgress} />
        <UtilityButton icon="folder" title={t("settings.exportDeck")} detail={t("settings.exportDeckDetail", { deck: activeDeckLabel })} onPress={onExportDeck} />
      </View>
      {Boolean(notice) && (
        <View style={styles.notice}>
          <MaterialIcons name="info" size={size.iconSmall} color={colors.action} />
          <Text style={[styles.noticeText, { textAlign }]}>{notice}</Text>
        </View>
      )}
    </SettingsSection>
  );
}

const styles = StyleSheet.create({
  utilityGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.lg },
  notice: { flexDirection: "row", alignItems: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.actionSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.lg },
  noticeText: { flex: 1, color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge }
});
