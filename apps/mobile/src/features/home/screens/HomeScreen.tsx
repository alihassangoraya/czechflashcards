import React from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { HomeContent } from "../components/HomeContent";
import { HomeHero } from "../components/HomeHero";
import { buildHomeHeroProps } from "../homeHeroPropsAdapter";
import type { HomeScreenProps } from "../homeScreenTypes";
import { useHomeScreenModel } from "../hooks/useHomeScreenModel";

export function HomeScreen(props: HomeScreenProps) {
  const { deck, settings, onSelectCategory } = props;
  const { width } = useWindowDimensions();
  const isWideLayout = width >= 768;
  const model = useHomeScreenModel(props);

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll}>
        <HomeHero {...buildHomeHeroProps({ model, props, wide: isWideLayout })} />
        <HomeContent deck={deck} settings={settings} model={model} onSelectCategory={onSelectCategory} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 }
});
