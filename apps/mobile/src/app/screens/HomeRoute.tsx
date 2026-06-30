import React from "react";
import { HomeScreen } from "../../features/home";
import type { MainScreenProps } from "./screenTypes";

type Props = Pick<MainScreenProps, "deck" | "cards" | "customCards" | "states" | "settings" | "savedCardIds" | "dailyProgress" | "accountEmail" | "syncStatus" | "onStartStudy" | "onSelectCategory" | "onSetPanel" | "onSetScreen">;

export function HomeRoute({ deck, cards, customCards, states, settings, savedCardIds, dailyProgress, accountEmail, syncStatus, onStartStudy, onSelectCategory, onSetPanel, onSetScreen }: Props) {
  return (
    <HomeScreen
      deck={deck}
      allCards={cards}
      states={states}
      settings={settings}
      savedCount={savedCardIds.size}
      customCount={customCards.length}
      dailyProgress={dailyProgress}
      accountEmail={accountEmail}
      syncStatus={syncStatus}
      onStartStudy={onStartStudy}
      onStartQuiz={() => onSetScreen("quiz")}
      onSelectCategory={onSelectCategory}
      onSearch={() => onSetPanel("search")}
      onAdd={() => onSetPanel("add")}
      onSettings={() => onSetPanel("settings")}
      onAccount={() => onSetPanel("account")}
    />
  );
}
