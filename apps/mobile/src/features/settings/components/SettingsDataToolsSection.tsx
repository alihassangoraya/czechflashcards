import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { spacing } from "../../../theme/design";
import { SettingsSection } from "./SettingsSection";
import { SettingsDataToolsNotice } from "./SettingsDataToolsNotice";
import { UtilityButton } from "./UtilityButton";

type Props = {
  notice?: string;
  onRestoreJson: () => void;
  onImportCsv: () => void;
  onExportProgress: () => void;
  onExportDeck: () => void;
  onExportAccountData: () => void;
};

export function SettingsDataToolsSection(props: Props) {
  const { t, textAlign } = useI18n();
  const { notice, onRestoreJson, onImportCsv, onExportProgress, onExportDeck, onExportAccountData } = props;
  return (
    <SettingsSection icon="assignment" title={t("account.dataTools")} description={t("account.dataToolsDescription")}>
      <View style={styles.grid}>
        <UtilityButton icon="refresh" title={t("settings.restoreJson")} detail={t("settings.restoreJsonDetail")} onPress={onRestoreJson} />
        <UtilityButton icon="library-add" title={t("settings.importCsv")} detail={t("account.importCsvDetail")} onPress={onImportCsv} />
        <UtilityButton icon="cloud-sync" title={t("account.exportAccount")} detail={t("account.exportAccountDetail")} onPress={onExportAccountData} />
        <UtilityButton icon="trending-up" title={t("settings.exportProgress")} detail={t("settings.exportProgressDetail")} onPress={onExportProgress} />
        <UtilityButton icon="folder" title={t("settings.exportDeck")} detail={t("account.exportDeckDetail")} onPress={onExportDeck} />
      </View>
      <SettingsDataToolsNotice notice={notice} textAlign={textAlign} />
    </SettingsSection>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.lg }
});
