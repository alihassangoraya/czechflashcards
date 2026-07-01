import React from "react";
import type { AuthProvider } from "../../../sync";
import { AuthDivider } from "./AuthDivider";
import { AuthProviderButtons } from "./AuthProviderButtons";

type Props = {
  busy: boolean;
  onProviderSubmit?: (provider: AuthProvider) => void;
};

export function AccountAuthProviders({ busy, onProviderSubmit }: Props) {
  if (!onProviderSubmit) return null;
  return (
    <>
      <AuthProviderButtons busy={busy} onPress={onProviderSubmit} />
      <AuthDivider />
    </>
  );
}
