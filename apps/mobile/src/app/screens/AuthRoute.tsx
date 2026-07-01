import React from "react";
import { AuthScreen } from "../../features/account";
import type { AuthRouteProps } from "./routeTypes";

export function AuthRoute({ screen, syncStatus, authBusy, onSetScreen, onAuthenticate, onAuthenticateProvider }: AuthRouteProps) {
  return (
    <AuthScreen
      configured={syncStatus !== "not-configured"}
      initialMode={screen === "register" ? "sign-up" : "sign-in"}
      busy={authBusy}
      onBack={() => onSetScreen("home")}
      onSwitchMode={(mode) => onSetScreen(mode === "sign-up" ? "register" : "login")}
      onAuthenticate={onAuthenticate}
      onAuthenticateProvider={onAuthenticateProvider}
    />
  );
}
