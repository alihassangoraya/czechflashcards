import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { SettingsSection } from "./SettingsSection";
import { UtilityButton } from "./UtilityButton";

type Props = {
  notice?: string;
  onRestoreJson: () => void;
  onImportCsv: () => void;
  onShuffleDue: () => void;
  onReviewAllNow: () => void;
  onExportProgress: () => void;
  onExportDeck: () => void;
};

export function DataToolsSection({ notice, onRestoreJson, onImportCsv, onShuffleDue, onReviewAllNow, onExportProgress, onExportDeck }: Props) {
  return (
    <SettingsSection icon="assignment" title="Data tools" description="Move your deck and progress in or out of this app.">
      <View style={styles.utilityGrid}>
        <UtilityButton icon="refresh" title="Restore JSON" detail="Load a progress backup" onPress={onRestoreJson} />
        <UtilityButton icon="library-add" title="Import CSV" detail="Add words from a file" onPress={onImportCsv} />
        <UtilityButton icon="swap-horiz" title="Shuffle due" detail="Mix ready cards" onPress={onShuffleDue} />
        <UtilityButton icon="today" title="Review all now" detail="Make this deck due" onPress={onReviewAllNow} />
        <UtilityButton icon="trending-up" title="Export progress" detail="Save a JSON backup" onPress={onExportProgress} />
        <UtilityButton icon="folder" title="Export deck" detail="Save current deck" onPress={onExportDeck} />
      </View>
      {Boolean(notice) && (
        <View style={styles.notice}>
          <MaterialIcons name="info" size={size.iconSmall} color={colors.action} />
          <Text style={styles.noticeText}>{notice}</Text>
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
