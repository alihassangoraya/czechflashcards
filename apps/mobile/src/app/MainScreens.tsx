import React from "react";
import type { Card, ReviewGrade, ReviewState } from "@czech-flashcards/shared";
import type { StudySettings } from "../database";
import { AuthScreen } from "../features/account/screens/AuthScreen";
import { HomeScreen } from "../features/home/screens/HomeScreen";
import { QuizScreen } from "../features/quiz/screens/QuizScreen";
import { StudyScreen } from "../features/study/screens/StudyScreen";
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
  authBusy: boolean;
  dailyProgress: string;
  reviewInterval: (grade: ReviewGrade) => string;
  onSetPanel: (panel: Panel | null) => void;
  onSetScreen: (screen: Screen) => void;
  onAuthenticate: (mode: "sign-in" | "sign-up", email: string, password: string, displayName: string) => Promise<string | null>;
  onStartStudy: () => void;
  onSelectCategory: (category: string) => void;
  onToggleSaved: (cardId: string, showFeedback?: boolean) => void;
  onSetDeckManagementCard: (card: Card | null) => void;
  onOpenCardEditor: (card?: Card | null) => void;
  onUndoLastReview: () => void;
  onGrade: (grade: ReviewGrade) => void;
};

export function MainScreens(props: Props) {
  const { screen, deck, cards, customCards, states, settings, savedCardIds, current, revealed, grading, lastReviewCard, sessionReviews, sessionTarget, reviewedToday, dailyGoal, sessionProgress, studyAnimations, accountEmail, syncStatus, authBusy, dailyProgress, reviewInterval, onSetPanel, onSetScreen, onAuthenticate, onStartStudy, onSelectCategory, onToggleSaved, onSetDeckManagementCard, onOpenCardEditor, onUndoLastReview, onGrade } = props;

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

      {(screen === "login" || screen === "register") && (
        <AuthScreen
          configured={syncStatus !== "not-configured"}
          initialMode={screen === "register" ? "sign-up" : "sign-in"}
          busy={authBusy}
          onBack={() => onSetScreen("home")}
          onSwitchMode={(mode) => onSetScreen(mode === "sign-up" ? "register" : "login")}
          onAuthenticate={onAuthenticate}
        />
      )}

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
          onManageDecks={onSetDeckManagementCard}
          onEditCard={() => onOpenCardEditor()}
          onCompleteSwipe={studyAnimations.completeSwipe}
          onUndoLastReview={onUndoLastReview}
          onGrade={onGrade}
        />
      )}
    </>
  );
}
