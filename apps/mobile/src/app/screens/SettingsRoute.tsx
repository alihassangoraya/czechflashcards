import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ScreenHeader } from "../../components/ScreenHeader";
import { SettingsPanel } from "../../features/settings";
import { useI18n } from "../../i18n/I18nProvider";
import { colors } from "../../theme/design";
import type { SettingsRouteProps } from "./routeTypes/settingsRouteProps";

export function SettingsRoute(props: SettingsRouteProps) {
  const { t, textAlign } = useI18n();
  const { settings, cards, deckMemberships, settingsNotice, onGoBack, onChangeSettings } = props;
  return (
    <View style={styles.screen}>
      <ScreenHeader title={t("common.settings")} backLabel={t("common.backHome")} textAlign={textAlign} onBack={onGoBack} />
      <ScrollView style={styles.scroll}>
        <SettingsPanel settings={settings} cards={cards} deckMemberships={deckMemberships} settingsNotice={settingsNotice} onChange={onChangeSettings} onRestoreJson={props.onRestoreJson} onImportCsv={props.onImportCsv} onExportProgress={props.onExportProgress} onExportDeck={props.onExportDeck} onExportAccountData={props.onExportAccountData} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 }
});
