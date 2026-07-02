import type { lightColors } from "./lightColors";

export type StaticColorTokens = { [Key in keyof typeof lightColors]: string };
export type ColorTokens = StaticColorTokens;
