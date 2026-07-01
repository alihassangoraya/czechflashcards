import React from "react";
import { StyleSheet, View } from "react-native";
import type { AuthProvider } from "../../../sync";
import { useI18n } from "../../../i18n/I18nProvider";
import { spacing } from "../../../theme/design";
import { AuthProviderButton } from "./AuthProviderButton";

type Props = {
  busy: boolean;
  onPress: (provider: AuthProvider) => void;
};

export function AuthProviderButtons({ busy, onPress }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.row}>
      <AuthProviderButton busy={busy} mark="G" provider="google" label={t("account.continueGoogle")} onPress={onPress} />
      <AuthProviderButton busy={busy} mark="f" provider="facebook" label={t("account.continueFacebook")} onPress={onPress} />
      <AuthProviderButton busy={busy} mark="A" provider="apple" label={t("account.continueApple")} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md }
});
