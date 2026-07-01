import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ScreenHeader } from "../../components/ScreenHeader";
import { AccountPanel } from "../../features/account";
import { useI18n } from "../../i18n/I18nProvider";
import { colors, spacing } from "../../theme/design";
import { buildAccountPanelProps } from "./accountPanelProps";
import type { AccountRouteProps } from "./routeTypes/accountRouteProps";

export function AccountRoute(props: AccountRouteProps) {
  const { t, textAlign } = useI18n();
  return (
    <View style={styles.screen}>
      <ScreenHeader title={t("modal.account")} backLabel={t("common.backHome")} textAlign={textAlign} onBack={props.onGoBack} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <AccountPanel {...buildAccountPanelProps(props)} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingBottom: spacing.screenBottom }
});
