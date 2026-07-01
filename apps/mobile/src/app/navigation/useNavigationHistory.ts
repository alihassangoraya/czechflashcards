import { useCallback, useMemo, useRef } from "react";
import type { Screen } from "../appTypes";

export function useNavigationHistory() {
  const stack = useRef<Screen[]>([]);
  const push = useCallback((from: Screen, to: Screen) => {
    if (from !== to) stack.current.push(from);
  }, []);
  const pop = useCallback(() => stack.current.pop() || null, []);
  const drop = useCallback(() => {
    stack.current.pop();
  }, []);
  const has = useCallback(() => stack.current.length > 0, []);
  return useMemo(() => ({ push, pop, drop, has }), [drop, has, pop, push]);
}
