import type { AuthMode, AuthProvider } from "../../../sync";

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
  onProviderSubmit: (provider: AuthProvider) => void;
  onSubmit: (mode: AuthMode) => void;
};
