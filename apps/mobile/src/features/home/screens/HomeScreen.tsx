import React from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { HomeContent } from "../components/HomeContent";
import { HomeHero } from "../components/HomeHero";
import { buildHomeHeroProps } from "../homeHeroPropsAdapter";
import type { HomeScreenProps } from "../homeScreenTypes";
import { useHomeScreenModel } from "../hooks/useHomeScreenModel";
import { homeScreenStyles as styles } from "./homeScreenStyles";

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
