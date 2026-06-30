import React from "react";
import type { AuthMode } from "../../../sync";
import { AccountAuthActions } from "./AccountAuthActions";
import { AccountAuthFields } from "./AccountAuthFields";
import { AccountAuthMessage } from "./AccountAuthMessage";

type Props = {
  busy: boolean;
  displayName: string;
  email: string;
  mode?: AuthMode;
  password: string;
  message: string;
  onChangeDisplayName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSwitchMode?: (mode: AuthMode) => void;
  onSubmit: (mode: AuthMode) => void;
};

export function AccountAuthForm({ busy, displayName, email, mode, password, message, onChangeDisplayName, onChangeEmail, onChangePassword, onSwitchMode, onSubmit }: Props) {
  const fixedMode = Boolean(mode);
  const activeMode = mode || "sign-in";

  return (
    <>
      <AccountAuthFields activeMode={activeMode} displayName={displayName} email={email} fixedMode={fixedMode} password={password} onChangeDisplayName={onChangeDisplayName} onChangeEmail={onChangeEmail} onChangePassword={onChangePassword} />
      <AccountAuthMessage message={message} />
      <AccountAuthActions activeMode={activeMode} busy={busy} fixedMode={fixedMode} onSwitchMode={onSwitchMode} onSubmit={onSubmit} />
    </>
  );
}
