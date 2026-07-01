import React from "react";
import { View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { spacing } from "../../../theme/design";
import { SettingsSection } from "../../settings/components/SettingsSection";
import { UtilityButton } from "../../settings/components/UtilityButton";
import { AccountDeleteButton } from "./AccountDeleteButton";

type Props = {
  busy: boolean;
  confirmingDelete: boolean;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  onRequestDelete: () => void;
  onResetPassword: () => void;
};

export function AccountSecuritySection(props: Props) {
  const { t } = useI18n();
  return (
    <SettingsSection icon="settings" title={t("account.security")} description={t("account.securityDescription")}>
      <View style={{ gap: spacing.md }}>
        <UtilityButton icon="refresh" title={t("account.resetPassword")} detail={t("account.resetPasswordDetail")} onPress={props.onResetPassword} />
        <AccountDeleteButton {...props} />
      </View>
    </SettingsSection>
  );
}
