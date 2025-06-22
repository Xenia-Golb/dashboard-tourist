import type { TouristCategory, TouristData } from "../types";

export function getTotalTourists(
  data: TouristData[],
  category?: TouristCategory,
  onlyChildren: boolean = false
): number {
  return data.reduce((total, item) => {
    if (category && item.category_tourist !== category) return total;
    if (onlyChildren && item.children !== "да") return total;
    return total + item.count_turist;
  }, 0);
}
