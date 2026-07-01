import React from "react";
import { AccountRoute, AuthRoute, HomeRoute, ProgressRoute, QuizRoute, ResetPasswordRoute, SettingsRoute, StudyRoute, type MainScreenProps } from "./screens";

export function MainScreens(props: MainScreenProps) {
  if (props.screen === "home") return <HomeRoute {...props} />;
  if (props.screen === "quiz") return <QuizRoute {...props} />;
  if (props.screen === "progress") return <ProgressRoute {...props} />;
  if (props.screen === "settings") return <SettingsRoute {...props} />;
  if (props.screen === "account") return <AccountRoute {...props} />;
  if (props.screen === "login" || props.screen === "register") return <AuthRoute {...props} />;
  if (props.screen === "reset-password") return <ResetPasswordRoute {...props} />;
  if (props.screen === "study") return <StudyRoute {...props} />;
  return null;
}
