import React from "react";
import { AccountSecuritySection } from "./AccountSecuritySection";
import type { AccountPanelState } from "../hooks/accountPanelStateTypes";

type Props = {
  account: AccountPanelState;
  busy: boolean;
};

export function SignedInSecurityActions({ account, busy }: Props) {
  return (
    <AccountSecuritySection
      busy={busy || account.lifecycleBusy}
      confirmingDelete={account.confirmingDelete}
      onCancelDelete={() => account.setConfirmingDelete(false)}
      onConfirmDelete={() => void account.confirmDeleteAccount()}
      onRequestDelete={() => account.setConfirmingDelete(true)}
      onResetPassword={() => void account.resetPassword()}
    />
  );
}
