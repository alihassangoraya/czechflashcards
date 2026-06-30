import { DAY, HOUR, MINUTE } from "./reviewIntervals";

export function formatInterval(ms: number): string {
  if (ms <= 0) return "Due now";
  if (ms < HOUR) return `${Math.ceil(ms / MINUTE)} min`;
  if (ms < DAY) return `${Math.ceil(ms / HOUR)} hr`;
  return `${Math.ceil(ms / DAY)} days`;
}
