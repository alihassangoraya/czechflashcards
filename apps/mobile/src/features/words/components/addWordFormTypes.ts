import type { CustomDeck } from "../../../database";
import type { AddWordFormState } from "../hooks/useAddWordForm";

export type AddWordFormProps = {
  form: AddWordFormState;
  decks: CustomDeck[];
};
