import React from "react";
import { AuthRoute, HomeRoute, QuizRoute, StudyRoute, type MainScreenProps } from "./screens";

export function MainScreens(props: MainScreenProps) {
  if (props.screen === "home") return <HomeRoute {...props} />;
  if (props.screen === "quiz") return <QuizRoute {...props} />;
  if (props.screen === "login" || props.screen === "register") return <AuthRoute {...props} />;
  if (props.screen === "study") return <StudyRoute {...props} />;
  return null;
}
