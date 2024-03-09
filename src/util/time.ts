export function isValidTime(existingTimes: string[], newTime: string) {
  const [newStart, newEnd] = newTime.split("-").map(Number);

  for (const time of existingTimes) {
    const [start, end] = time.split("-").map(Number);

    if (newStart < end && newEnd > start) {
      return false;
    }
  }
  return true;
}

export const times = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
