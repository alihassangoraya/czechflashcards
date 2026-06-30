import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { AppToast } from "../components/AppToast";
import { I18nProvider } from "../i18n/I18nProvider";
import { AppPanels } from "./AppPanels";
import { appShellStyles as styles } from "./appShellStyles";
import type { AppShellProps } from "./appShellTypes";
import { MainScreens } from "./MainScreens";

export function AppShell(props: AppShellProps) {
  return (
    <I18nProvider language={props.settings.appLanguage}>
      <SafeAreaView style={styles.shell}>
        <StatusBar barStyle="dark-content" />
        <MainScreens {...props} />
        <AppPanels {...props} />
        <AppToast message={props.toastMessage} />
      </SafeAreaView>
    </I18nProvider>
  );
}
