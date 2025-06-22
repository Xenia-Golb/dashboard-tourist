import { type TouristData, type GroupedData } from "../types";

export function groupDataByYear(data: TouristData[]): GroupedData[] {
  const result: GroupedData[] = [];

  data.forEach((item) => {
    const year = item.year;
    const category = item.category_tourist;
    const tourists = item.count_turist;

    let entry = result.find((el) => el.year === year);

    if (!entry) {
      entry = {
        year,
        "Граждане РФ": 0,
        "Граждане стран ближнего зарубежья": 0,
        "Граждане стран дальнего зарубежья": 0,
        Дети: 0,
      };
      result.push(entry);
    }

    if (item.children === "да") {
      entry.children += tourists;
    }

    entry[category] += tourists;
  });

  return result;
}
export function getTotalTouristsForYear(
  data: GroupedData,
  category?: string
): number {
  if (category) {
    return data[category] || 0;
  }
  return (
    data["Граждане РФ"] +
    data["Граждане стран ближнего зарубежья"] +
    data["Граждане стран дальнего зарубежья"]
  );
}
