import { useState } from "react";
import { deleteAccount, sendPasswordReset, type AppSupabaseClient } from "../../../sync";
import { useI18n } from "../../../i18n/I18nProvider";

type Params = {
  accountEmail: string | null;
  supabase: AppSupabaseClient;
  setMessage: (message: string) => void;
  onSignOut: () => Promise<string | null>;
};

export function useAccountLifecycle({ accountEmail, supabase, setMessage, onSignOut }: Params) {
  const { t } = useI18n();
  const [lifecycleBusy, setLifecycleBusy] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  async function resetPassword() {
    if (!accountEmail) return;
    setLifecycleBusy(true);
    const error = await sendPasswordReset(supabase, accountEmail);
    setMessage(error || t("account.resetEmailSent"));
    setLifecycleBusy(false);
  }

  async function confirmDeleteAccount() {
    setLifecycleBusy(true);
    const error = await deleteAccount(supabase);
    if (error) setMessage(error);
    else {
      await onSignOut();
      setMessage(t("account.deleted"));
    }
    setConfirmingDelete(false);
    setLifecycleBusy(false);
  }

  return { confirmingDelete, lifecycleBusy, confirmDeleteAccount, resetPassword, setConfirmingDelete };
}
