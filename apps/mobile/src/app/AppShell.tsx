import React from "react";
import { SafeAreaView, StatusBar, type ViewStyle } from "react-native";
import { AppToast } from "../components/AppToast";
import { I18nProvider, useI18n } from "../i18n/I18nProvider";
import { AppPanels } from "./AppPanels";
import { appShellStyles as styles } from "./appShellStyles";
import type { AppShellProps } from "./appTypes";
import { MainScreens } from "./MainScreens";
import { ThemeModeSync } from "./ThemeModeSync";
import { resolveThemePreference } from "../theme/systemThemeMode";

export function AppShell(props: AppShellProps) {
  return (
    <I18nProvider language={props.settings.appLanguage}>
      <AppShellFrame {...props} />
    </I18nProvider>
  );
}

function AppShellFrame(props: AppShellProps) {
  const { direction } = useI18n();
  const resolvedThemeMode = resolveThemePreference(props.settings.themeMode);
  const directionStyle = { direction, writingDirection: direction } as ViewStyle;

  return (
    <SafeAreaView style={[styles.shell, directionStyle]}>
      <ThemeModeSync themePreference={props.settings.themeMode} />
      <StatusBar barStyle={resolvedThemeMode === "dark" ? "light-content" : "dark-content"} />
      <MainScreens {...props} />
      <AppPanels {...props} />
      <AppToast message={props.toastMessage} />
    </SafeAreaView>
  );
}
