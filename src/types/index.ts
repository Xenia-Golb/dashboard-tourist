export type TouristCategory =
  | "Все туристы"
  | "Граждане РФ"
  | "Граждане стран ближнего зарубежья"
  | "Граждане стран дальнего зарубежья";

export type TouristData = {
  ID: number;
  год: number;
  регион: string;
  страна: string;
  категория_туриста: TouristCategory;
  дети: "да" | "нет";
  count_turist: number;
  count_turist_befo_year: number;
};

export type GroupedData = {
  year: number;
  [key: string]: number | string;
};
export interface ChartState {
  selectedCategory: TouristCategory;
  showChildren: boolean;
  highlightedYear: number | null;
}
export interface BarData {
  year: number;
  [key: string]: number | string | undefined;
}
