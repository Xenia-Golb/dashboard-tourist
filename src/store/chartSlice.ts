import { createSlice } from "@reduxjs/toolkit";
import type { ChartState } from "../types";

const initialState: ChartState = {
  selectedCategory: "Все туристы",
  showChildren: false,
  highlightedYear: null,
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    toggleChildren(state) {
      state.showChildren = !state.showChildren;
    },
    setHighlightedYear(state, action) {
      state.highlightedYear = action.payload;
    },
  },
});

export const { setCategory, toggleChildren, setHighlightedYear } =
  chartSlice.actions;

export default chartSlice.reducer;
