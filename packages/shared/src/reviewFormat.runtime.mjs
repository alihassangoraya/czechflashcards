import { DAY, HOUR, MINUTE } from "./reviewIntervals.runtime.mjs";

export function formatInterval(ms) {
  if (ms <= 0) return "Due now";
  if (ms < HOUR) return `${Math.ceil(ms / MINUTE)} min`;
  if (ms < DAY) return `${Math.ceil(ms / HOUR)} hr`;
  return `${Math.ceil(ms / DAY)} days`;
}
