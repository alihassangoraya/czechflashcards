import React from "react";
import { AuthScreen } from "../../features/account";
import type { AuthRouteProps } from "./routeTypes";

export function AuthRoute({ screen, syncStatus, supabase, authBusy, showToast, onGoBack, onSetScreen, onAuthenticate, onAuthenticateProvider }: AuthRouteProps) {
  async function authenticateAndReturn(...args: Parameters<typeof onAuthenticate>) {
    const error = await onAuthenticate(...args);
    if (!error) onSetScreen("account");
    return error;
  }
  return (
    <AuthScreen
      configured={syncStatus !== "not-configured"}
      initialMode={screen === "register" ? "sign-up" : "sign-in"}
      busy={authBusy}
      supabase={supabase}
      onBack={onGoBack}
      onSwitchMode={(mode) => onSetScreen(mode === "sign-up" ? "register" : "login")}
      onAuthenticate={authenticateAndReturn}
      onAuthenticateProvider={onAuthenticateProvider}
      showToast={showToast}
    />
  );
}
