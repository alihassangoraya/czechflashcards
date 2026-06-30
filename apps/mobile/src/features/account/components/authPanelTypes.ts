import type { AuthMode } from "../models/accountAuth";

export type AuthPanelProps = {
  busy: boolean;
  configured: boolean;
  displayName: string;
  email: string;
  isRegister: boolean;
  message: string;
  mode: AuthMode;
  password: string;
  onChangeDisplayName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSwitchMode: (mode: AuthMode) => void;
  onSubmit: (mode: AuthMode) => void;
};
