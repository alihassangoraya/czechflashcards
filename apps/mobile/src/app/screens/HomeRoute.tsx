import React from "react";
import { HomeScreen } from "../../features/home";
import type { HomeRouteProps } from "./routeTypes";

export function HomeRoute({ deck, cards, customCards, states, settings, savedCardIds, dailyProgress, accountEmail, syncStatus, onStartStudy, onSelectCategory, onSetPanel, onSetScreen }: HomeRouteProps) {
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
      onOpenProgress={() => onSetScreen("progress")}
      onSelectCategory={onSelectCategory}
      onSearch={() => onSetPanel("search")}
      onAdd={() => onSetPanel("add")}
      onSettings={() => onSetPanel("settings")}
      onAccount={() => onSetPanel("account")}
    />
  );
}
