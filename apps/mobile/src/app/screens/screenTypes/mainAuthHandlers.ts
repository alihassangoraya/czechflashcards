import type { AuthMode } from "../../../sync";

export type MainAuthHandlers = {
  onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>;
};
