import React from "react";
import { AppModal } from "../../components/AppModal";
import { AccountPanel } from "../../features/account";
import { useI18n } from "../../i18n/I18nProvider";
import type { AppPanelProps } from "./panelTypes";

type Props = Pick<AppPanelProps, "panel" | "supabase" | "accountEmail" | "accountStudySummary" | "authBusy" | "onSetPanel" | "onAuthenticate" | "onSignOut">;

export function AccountModal({ panel, supabase, accountEmail, accountStudySummary, authBusy, onSetPanel, onAuthenticate, onSignOut }: Props) {
  const { t } = useI18n();
  return (
    <AppModal visible={panel === "account"} title={t("modal.account")} onClose={() => onSetPanel(null)}>
      <AccountPanel configured={Boolean(supabase)} supabase={supabase} accountEmail={accountEmail} studySummary={accountStudySummary} busy={authBusy} onAuthenticate={onAuthenticate} onSignOut={onSignOut} />
    </AppModal>
  );
}
