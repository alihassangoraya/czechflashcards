import type { Card } from "@czech-flashcards/shared";

type Translate = (key: "toast.cardFallback" | "toast.starredAdded" | "toast.starredRemoved" | "toast.starredFailed", params?: { word: string }) => string;

export function savedCardSuccessMessage(card: Card | undefined, saved: boolean, translate: Translate): string {
  const word = card?.cz || translate("toast.cardFallback");
  return saved ? translate("toast.starredAdded", { word }) : translate("toast.starredRemoved", { word });
}

export function savedCardFailureMessage(translate: Translate): string {
  return translate("toast.starredFailed");
}
