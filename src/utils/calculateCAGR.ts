import type { GroupedData } from "../types";
import { getTotalTouristsForYear } from "./groupByYear";

export function calculateCAGR(
  data: GroupedData[],
  category?: string
): number[] {
  const cagrList: number[] = [];
  let prevTotal = 0;

  data.forEach((entry, index) => {
    const total = getTotalTouristsForYear(entry, category);

    if (index > 0 && prevTotal !== 0) {
      const growthRate = (total / prevTotal - 1) * 100;
      cagrList.push(Number(growthRate.toFixed(2)));
    } else {
      cagrList.push(0);
    }

    prevTotal = total;
  });

  return cagrList;
}
