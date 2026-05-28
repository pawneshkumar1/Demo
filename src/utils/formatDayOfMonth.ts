export const formatDayOfMonth = (day?: string | number) => {
  if (!day) return "N/A";

  const d = Number(day);

  const suffix =
    d >= 11 && d <= 13
      ? "th"
      : ["st", "nd", "rd"][d % 10 - 1] || "th";

  return `${d}${suffix} day of month`;
};