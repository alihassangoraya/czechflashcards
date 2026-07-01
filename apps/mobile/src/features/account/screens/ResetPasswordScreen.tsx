import React from "react";
import { ScrollView } from "react-native";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { useI18n } from "../../../i18n/I18nProvider";
import type { AppSupabaseClient } from "../../../sync";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { usePasswordResetForm } from "../hooks/usePasswordResetForm";
import { authScreenStyles as styles } from "./authScreenStyles";

type Props = {
  supabase: AppSupabaseClient;
  showToast: (message: string) => void;
  onBack: () => void;
  onDone: () => void;
};

export function ResetPasswordScreen({ supabase, showToast, onBack, onDone }: Props) {
  const { t } = useI18n();
  const form = usePasswordResetForm({ supabase, showToast, onDone });

  return (
    <>
      <ScreenHeader title={t("account.resetTitle")} backLabel={t("common.backHome")} onBack={onBack} />
      <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
        <ResetPasswordForm
          busy={form.busy} confirmPassword={form.confirmPassword} message={form.message} password={form.password}
          styles={styles} onChangeConfirmPassword={form.setConfirmPassword} onChangePassword={form.setPassword}
          onSubmit={() => void form.submit()}
        />
      </ScrollView>
    </>
  );
}
