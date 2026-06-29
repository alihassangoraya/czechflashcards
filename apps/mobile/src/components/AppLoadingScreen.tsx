import React from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from "react-native";
import { colors } from "../theme/design";

export function AppLoadingScreen() {
  return (
    <SafeAreaView style={styles.shell}>
      <ActivityIndicator />
      <Text style={styles.muted}>Preparing offline study mode...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: colors.background },
  muted: { color: colors.textMuted, lineHeight: 20 }
});
