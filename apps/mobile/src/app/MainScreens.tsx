import React from "react";
import type { Card, ReviewGrade, ReviewState } from "@czech-flashcards/shared";
import type { StudySettings } from "../database";
import { HomeScreen } from "../features/home/HomeScreen";
import { QuizScreen } from "../features/quiz/QuizScreen";
import { StudyScreen } from "../features/study/StudyScreen";
import { useStudyAnimations } from "../features/study/useStudyAnimations";
import type { SyncStatus } from "../sync";
import type { Panel, Screen } from "./appTypes";

type StudyAnimations = ReturnType<typeof useStudyAnimations>;

type Props = {
  screen: Screen;
  deck: Card[];
  cards: Card[];
  customCards: Card[];
  states: Record<string, ReviewState>;
  settings: StudySettings;
  savedCardIds: Set<string>;
  current: Card | null;
  revealed: boolean;
  grading: boolean;
  lastReviewCard: Card | null;
  sessionReviews: number;
  sessionTarget: number;
  reviewedToday: number;
  dailyGoal: number;
  sessionProgress: number;
  studyAnimations: StudyAnimations;
  accountEmail: string | null;
  syncStatus: SyncStatus;
  dailyProgress: string;
  reviewInterval: (grade: ReviewGrade) => string;
  onSetPanel: (panel: Panel | null) => void;
  onSetScreen: (screen: Screen) => void;
  onStartStudy: () => void;
  onSelectCategory: (category: string) => void;
  onToggleSaved: (cardId: string, showFeedback?: boolean) => void;
  onOpenCardEditor: (card?: Card | null) => void;
  onUndoLastReview: () => void;
  onGrade: (grade: ReviewGrade) => void;
};

export function MainScreens(props: Props) {
  const { screen, deck, cards, customCards, states, settings, savedCardIds, current, revealed, grading, lastReviewCard, sessionReviews, sessionTarget, reviewedToday, dailyGoal, sessionProgress, studyAnimations, accountEmail, syncStatus, dailyProgress, reviewInterval, onSetPanel, onSetScreen, onStartStudy, onSelectCategory, onToggleSaved, onOpenCardEditor, onUndoLastReview, onGrade } = props;

  return (
    <>
      {screen === "home" && (
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
      )}

      {screen === "quiz" && <QuizScreen deck={deck} onClose={() => onSetScreen("home")} />}

      {screen === "study" && (
        <StudyScreen
          current={current}
          settings={settings}
          savedCardIds={savedCardIds}
          revealed={revealed}
          flipping={studyAnimations.flipping}
          grading={grading}
          swipeDirection={studyAnimations.swipeDirection}
          lastReviewCard={lastReviewCard}
          sessionReviews={sessionReviews}
          sessionTarget={sessionTarget}
          reviewedToday={reviewedToday}
          dailyGoal={dailyGoal}
          sessionProgress={sessionProgress}
          dragX={studyAnimations.dragX}
          flipProgress={studyAnimations.flipProgress}
          cardRotation={studyAnimations.cardRotation}
          panHandlers={studyAnimations.panHandlers}
          reviewInterval={reviewInterval}
          onBack={() => onSetScreen("home")}
          onOpenGrammar={() => onSetPanel("grammar")}
          onFlipCard={studyAnimations.flipCard}
          onToggleSaved={(cardId) => onToggleSaved(cardId, true)}
          onEditCard={() => onOpenCardEditor()}
          onCompleteSwipe={studyAnimations.completeSwipe}
          onUndoLastReview={onUndoLastReview}
          onGrade={onGrade}
        />
      )}
    </>
  );
}
