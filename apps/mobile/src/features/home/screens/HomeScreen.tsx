import React from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { HomeContent } from "../components/HomeContent";
import { HomeHero } from "../components/HomeHero";
import type { HomeScreenProps } from "../homeScreenTypes";
import { useHomeScreenModel } from "../hooks/useHomeScreenModel";

export function HomeScreen(props: HomeScreenProps) {
  const {
    deck,
    settings,
    accountEmail,
    onStartStudy,
    onStartQuiz,
    onSelectCategory,
    onSearch,
    onAdd,
    onSettings,
    onAccount
  } = props;
  const { width } = useWindowDimensions();
  const isWideLayout = width >= 768;
  const model = useHomeScreenModel(props);

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll}>
        <HomeHero
          activeDeckLabel={model.activeDeckLabel}
          examLevel={settings.examLevel}
          dueCount={model.dueCount}
          accountEmail={accountEmail}
          wide={isWideLayout}
          onStartStudy={onStartStudy}
          onStartQuiz={onStartQuiz}
          onSearch={onSearch}
          onAdd={onAdd}
          onSettings={onSettings}
          onAccount={onAccount}
        />
        <HomeContent deck={deck} settings={settings} model={model} onSelectCategory={onSelectCategory} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 }
});
