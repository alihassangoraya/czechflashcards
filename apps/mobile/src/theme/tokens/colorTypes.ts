import type { lightColors } from "./lightColors";

export type ColorTokens = { [Key in keyof typeof lightColors]: string };
