import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { AppToast } from "../components/AppToast";
import { colors } from "../theme/design";
import { AppPanels } from "./AppPanels";
import type { AppShellProps } from "./appShellTypes";
import { MainScreens } from "./MainScreens";

export function AppShell(props: AppShellProps) {
  return (
    <SafeAreaView style={styles.shell}>
      <StatusBar barStyle="dark-content" />
      <MainScreens {...props} />
      <AppPanels {...props} />
      <AppToast message={props.toastMessage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: colors.background }
});
