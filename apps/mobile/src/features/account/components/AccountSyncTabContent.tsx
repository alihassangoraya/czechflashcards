import React from "react";
import { useI18n } from "../../../i18n/I18nProvider";
import type { AccountPanelState } from "../hooks/accountPanelStateTypes";
import { AccountOverviewCard } from "./AccountOverviewCard";
import { AccountSignOutButton } from "./AccountSignOutButton";
import { SignedInSecurityActions } from "./SignedInSecurityActions";
import type { SignedInAccountContentProps } from "./signedInAccountTypes";

type Props = SignedInAccountContentProps & {
  account: AccountPanelState;
};

export function AccountSyncTabContent({ account, accountEmail, busy, syncStatus, onSyncNow }: Props) {
  const { t } = useI18n();

  return (
    <>
      <AccountOverviewCard accountEmail={accountEmail} syncStatus={syncStatus} onSyncNow={onSyncNow} />
      <SignedInSecurityActions account={account} busy={busy} />
      <AccountSignOutButton busy={busy} label={t("account.signOut")} onSignOut={() => void account.signOut()} />
    </>
  );
}
