import React from "react";
import { AuthScreen } from "../../features/account";
import type { MainScreenProps } from "./screenTypes";

type Props = Pick<MainScreenProps, "screen" | "syncStatus" | "authBusy" | "onSetScreen" | "onAuthenticate">;

export function AuthRoute({ screen, syncStatus, authBusy, onSetScreen, onAuthenticate }: Props) {
  return (
    <AuthScreen
      configured={syncStatus !== "not-configured"}
      initialMode={screen === "register" ? "sign-up" : "sign-in"}
      busy={authBusy}
      onBack={() => onSetScreen("home")}
      onSwitchMode={(mode) => onSetScreen(mode === "sign-up" ? "register" : "login")}
      onAuthenticate={onAuthenticate}
    />
  );
}
