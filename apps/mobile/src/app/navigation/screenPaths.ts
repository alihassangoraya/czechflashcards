import type { Screen } from "../appTypes";

export const screenPaths: Record<Screen, string> = {
  home: "/",
  account: "/account",
  login: "/login",
  progress: "/progress",
  quiz: "/quiz",
  register: "/register",
  "reset-password": "/reset-password",
  settings: "/settings",
  study: "/flashcards"
};
