export type ThemeMode = "light" | "dark";

const shared = {
  spacing: {
    none: 0,
    hairline: 1,
    xxs: 2,
    xs: 3,
    sm: 4,
    smd: 5,
    md: 6,
    mdPlus: 7,
    lg: 8,
    lgPlus: 10,
    xl: 12,
    xlPlus: 14,
    page: 15,
    xxl: 16,
    panel: 18,
    card: 20,
    hero: 24,
    screenBottom: 32
  },
  radius: {
    xs: 3,
    sm: 6,
    md: 8,
    lg: 10,
    xl: 12,
    card: 16
  },
  size: {
    iconSmall: 17,
    icon: 20,
    iconMedium: 22,
    iconLarge: 24,
    headerAction: 42,
    cardAction: 36,
    navAction: 36,
    touchTarget: 42,
    reviewButton: 48,
    quizOptionHeight: 60,
    quizResultIcon: 72,
    categoryCardHeight: 64,
    categoryIcon: 32,
    cardHeight: 400,
    heroHeight: 208,
    heroWideHeight: 280
  },
  typography: {
    micro: 10,
    caption: 11,
    label: 12,
    bodySmall: 13,
    body: 14,
    bodyLarge: 16,
    titleSmall: 17,
    title: 18,
    screenTitle: 21,
    display: 28,
    word: 48,
    weightRegular: "400" as const,
    weightMedium: "500" as const,
    weightSemibold: "600" as const,
    weightBold: "700" as const
  }
};

const lightColors = {
  primary: "#5d6246",
  primaryDeep: "#244d43",
  success: "#4f7a56",
  successStrong: "#167b55",
  danger: "#a34f4f",
  dangerStrong: "#b33b32",
  warning: "#b07d3e",
  action: "#2f6f9f",
  actionMuted: "#53665e",
  background: "#f4f1ea",
  surface: "#ffffff",
  surfaceWarm: "#fbfaf7",
  surfaceSecondary: "#fbfaf6",
  surfaceMuted: "#e4ebe3",
  sheet: "#f2f5ef",
  textStrong: "#17231f",
  text: "#2d2a26",
  textBody: "#22352f",
  textDeep: "#20362f",
  textExample: "#31463d",
  textSoft: "#51645b",
  textMuted: "#6d7f75",
  textSubtle: "#7a766b",
  muted: "#8c887d",
  border: "#d8e2d7",
  borderSoft: "#e8e2d9",
  borderMuted: "#9aa9a1",
  dangerBorder: "#e5b8b3",
  dangerSoft: "rgba(163,79,79,0.12)",
  progressTrack: "#eee8df",
  progressTrackStrong: "#e1ddd4",
  actionSoft: "#edf4f8",
  warningBorder: "rgba(176,125,62,0.42)",
  goldSoft: "rgba(176,125,62,0.13)",
  mintSoft: "rgba(79,122,86,0.15)",
  primarySoft: "rgba(93,98,70,0.16)",
  heroOverlay: "rgba(32,22,19,0.46)",
  heroPill: "rgba(255,255,255,0.20)",
  heroControl: "rgba(0,0,0,0.34)",
  heroText: "#ffffff",
  heroTextMuted: "rgba(255,255,255,0.82)",
  heroTextSecondary: "rgba(255,255,255,0.92)",
  heroOutline: "rgba(255,255,255,0.50)",
  modalOverlay: "rgba(23,33,27,0.42)",
  stampSurface: "rgba(255,255,255,0.92)",
  onPrimary: "#ffffff",
  onPrimaryMuted: "rgba(255,255,255,0.82)",
  transparent: "transparent",
  // Compatibility aliases for existing components. New code should use the semantic names above.
  bohemianBlue: "#5d6246",
  bohemianRed: "#a34f4f",
  bohemianGold: "#b07d3e",
  warmSand: "#fdfbf7",
  appBackground: "#f4f1ea",
  charcoalText: "#2d2a26",
  card: "#ffffff",
  lightSand: "#e8e2d9",
  softMint: "#4f7a56",
  mutedSlate: "#8c887d",
  darkTaupe: "#7a766b",
  inkSoft: "#514c43"
};

const darkColors: typeof lightColors = {
  ...lightColors,
  background: "#171a17",
  surface: "#222722",
  surfaceWarm: "#20241f",
  surfaceSecondary: "#1d211d",
  surfaceMuted: "#303730",
  sheet: "#20261f",
  textStrong: "#f4f1ea",
  text: "#f4f1ea",
  textBody: "#e5e8e1",
  textDeep: "#eef1eb",
  textExample: "#d7ddd5",
  textSoft: "#c5ccc2",
  textMuted: "#a9b1a5",
  textSubtle: "#b7bdb3",
  muted: "#aeb5ab",
  border: "#455047",
  borderSoft: "#3a443c",
  borderMuted: "#69756a",
  progressTrack: "#3a443c",
  progressTrackStrong: "#465047",
  actionSoft: "#263a45",
  heroOverlay: "rgba(0,0,0,0.50)",
  stampSurface: "rgba(34,39,34,0.94)",
  bohemianBlue: "#5d6246",
  bohemianRed: "#a34f4f",
  bohemianGold: "#b07d3e",
  warmSand: "#20241f",
  appBackground: "#171a17",
  charcoalText: "#f4f1ea",
  card: "#222722",
  lightSand: "#3a443c",
  softMint: "#4f7a56",
  mutedSlate: "#aeb5ab",
  darkTaupe: "#b7bdb3",
  inkSoft: "#c5ccc2"
};

export const themes = {
  light: { ...shared, colors: lightColors },
  dark: { ...shared, colors: darkColors }
} as const;

export type AppTheme = (typeof themes)[ThemeMode];

export function getTheme(mode: ThemeMode = "light"): AppTheme {
  return themes[mode];
}

// Components use the light theme today; a provider can switch this source when dark mode is enabled.
export const theme = themes.light;
export const { colors, radius, spacing, size, typography } = theme;

export const shadow = {
  soft: {
    shadowColor: colors.text,
    shadowOffset: { width: spacing.none, height: spacing.lg },
    shadowOpacity: 0.08,
    shadowRadius: spacing.xxl,
    elevation: spacing.xxs
  }
};
