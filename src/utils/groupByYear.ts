import { type TouristData, type GroupedData } from "../types";

export function groupDataByYear(data: TouristData[]): GroupedData[] {
  const groupedMap: Record<number, Record<string, number>> = {};

  data.forEach((item) => {
    const year = item.год;
    const category = item.категория_туриста;
    const tourists = item.count_turist;

    if (!groupedMap[year]) {
      groupedMap[year] = {
        "Граждане РФ": 0,
        "Граждане стран ближнего зарубежья": 0,
        "Граждане стран дальнего зарубежья": 0,
        Дети: 0,
      };
    }

    if (item.дети === "да") {
      groupedMap[year]["Дети"] += tourists;
    }

    groupedMap[year][category] += tourists;
  });

  return Object.keys(groupedMap).map((yearStr) => {
    const year = parseInt(yearStr);
    const values = groupedMap[year];

    return {
      year,
      ...values,
    };
  });
}
export function getTotalTouristsForYear(
  data: GroupedData,
  category?: string
): number {
  if (category) {
    return (data[category] as number) || 0;
  }
  return (
    ((data["Граждане РФ"] as number) || 0) +
    ((data["Граждане стран ближнего зарубежья"] as number) || 0) +
    ((data["Граждане стран дальнего зарубежья"] as number) || 0)
  );
}
