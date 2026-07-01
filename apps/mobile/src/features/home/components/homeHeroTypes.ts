export type HomeHeroProps = {
  activeDeckLabel: string;
  examLevel: string;
  dueCount: number;
  accountEmail: string | null;
  accountName: string | null;
  wide: boolean;
  onStartStudy: () => void;
  onStartQuiz: () => void;
  onOpenProgress: () => void;
  onSearch: () => void;
  onAdd: () => void;
  onSettings: () => void;
  onAccount: () => void;
};
