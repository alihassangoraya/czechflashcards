export type QuizOptionProps = {
  option: string;
  letter: string;
  selected: boolean;
  correct: boolean;
  checked: boolean;
  onPress: () => void;
};
