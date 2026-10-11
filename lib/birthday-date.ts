export type BirthdayStatus =
  | { kind: "before"; days: number }
  | { kind: "today" }
  | { kind: "after" };

/**
 * Compares the visitor's LOCAL calendar date with the birthday (YYYY-MM-DD).
 * Both dates are reduced to UTC midnight of their calendar day first, so the
 * result is a whole number of days and is immune to DST shifts and midnight edge cases.
 */
export function getBirthdayStatus(isoDate: string, now: Date = new Date()): BirthdayStatus {
  const [y, m, d] = isoDate.split("-").map(Number);
  const target = Date.UTC(y, m - 1, d);
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.round((target - today) / 86_400_000);
  if (diff > 0) return { kind: "before", days: diff };
  if (diff === 0) return { kind: "today" };
  return { kind: "after" };
}
