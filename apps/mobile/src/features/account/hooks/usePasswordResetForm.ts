import { useEffect, useState } from "react";
import { useI18n } from "../../../i18n/I18nProvider";
import { consumePasswordRecoverySession, updateRecoveredPassword, type AppSupabaseClient } from "../../../sync";

type Params = {
  supabase: AppSupabaseClient;
  showToast: (message: string) => void;
  onDone: () => void;
};
export function usePasswordResetForm({ supabase, showToast, onDone }: Params) {
  const { t } = useI18n();
  const [password, setPassword] = useState(""), [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    void consumeRecovery();
  }, []);

  async function consumeRecovery() {
    setBusy(true);
    const error = await consumePasswordRecoverySession(supabase);
    setMessage(error || "");
    setBusy(false);
  }

  async function submit() {
    const validation = password.length < 6 ? t("account.shortPassword") : password !== confirmPassword ? t("account.passwordMismatch") : "";
    if (validation) return setMessage(validation);
    setBusy(true);
    const error = await updateRecoveredPassword(supabase, password);
    setBusy(false);
    if (error) return setMessage(error);
    showToast(t("account.passwordUpdated"));
    onDone();
  }

  return { busy, confirmPassword, message, password, setConfirmPassword, setPassword, submit };
}
