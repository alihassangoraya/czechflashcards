export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shiftDate(date: Date, offset: number) {
  const next = new Date(date);
  next.setDate(date.getDate() + offset);
  return next;
}

export function recentDateKeys(count: number, today = new Date()) {
  return Array.from({ length: count }, (_, index) => {
    const date = shiftDate(today, index - count + 1);
    return { key: formatDateKey(date), label: date.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 3) };
  });
}

export function previousDateKey(key: string) {
  return formatDateKey(shiftDate(new Date(`${key}T00:00:00`), -1));
}
