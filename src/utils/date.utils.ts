export const formatDate = (start: Date | string) => {
  return `${start?.toString().slice(8, 10)}/${start
    ?.toString()
    .slice(5, 7)}/${start?.toString().slice(0, 4)}`;
};

export const formatDateToDDMMYYYY = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

export const daysBetweenTodayAnd = (dateString: string): number | null => {
  const target = new Date(dateString);
  if (isNaN(target.getTime())) return null;

  const today = new Date();

  const targetMidnight = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const diffMs = todayMidnight.getTime() - targetMidnight.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return Math.abs(Math.floor(diffDays));
};

// Useful to ignore timezone when converting input date before sending to backend:
//    2025-11-11T00:00:00.000GMT+2 -> 2025-11-11T00:00:00.000Z
export const removeZoneFromJSDate = (date: Date): Date => {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
};
