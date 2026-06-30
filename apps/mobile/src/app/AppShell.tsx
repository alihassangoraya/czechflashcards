import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { AppToast } from "../components/AppToast";
import { I18nProvider } from "../i18n/I18nProvider";
import { AppPanels } from "./AppPanels";
import { appShellStyles as styles } from "./appShellStyles";
import type { AppShellProps } from "./appTypes";
import { MainScreens } from "./MainScreens";
import { ThemeModeSync } from "./ThemeModeSync";
import { resolveThemePreference } from "../theme/systemThemeMode";

export function AppShell(props: AppShellProps) {
  const resolvedThemeMode = resolveThemePreference(props.settings.themeMode);

  return (
    <I18nProvider language={props.settings.appLanguage}>
      <SafeAreaView style={styles.shell}>
        <ThemeModeSync themePreference={props.settings.themeMode} />
        <StatusBar barStyle={resolvedThemeMode === "dark" ? "light-content" : "dark-content"} />
        <MainScreens {...props} />
        <AppPanels {...props} />
        <AppToast message={props.toastMessage} />
      </SafeAreaView>
    </I18nProvider>
  );
}
