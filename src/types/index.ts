export type TouristCategory =
  | "Все туристы"
  | "Граждане РФ"
  | "Граждане стран ближнего зарубежья"
  | "Граждане стран дальнего зарубежья";

export type TouristData = {
  ID: number;
  year: number;
  region: string;
  country: string;
  category_tourist: TouristCategory;
  children: "да" | "нет";
  count_turist: number;
  count_turist_befo_year: number;
};
export interface YearlyStats {
  "Граждане РФ": number;
  "Граждане стран ближнего зарубежья": number;
  "Граждане стран дальнего зарубежья": number;
  Дети: number;
}

export interface GroupedData {
  year: number;
  [key: string]: number;
}
export interface ChartState {
  selectedCategory: TouristCategory;
  showChildren: boolean;
  highlightedYear: number | null;
}
export interface BarData {
  year: number;
  [key: string]: number | string | undefined;
}
