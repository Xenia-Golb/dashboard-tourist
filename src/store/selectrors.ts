import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./";

export const selectChartState = (state: RootState) => state.chart;
export const selectChartFilters = createSelector(
  [selectChartState],
  (chart) => ({
    selectedCategory: chart.selectedCategory,
    showChildren: chart.showChildren,
  })
);
