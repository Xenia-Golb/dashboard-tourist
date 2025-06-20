import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./chartSlice";
import type { ChartState } from "../types";

export const store = configureStore({
  reducer: {
    chart: chartReducer,
  },
});
export type RootState = {
  chart: ChartState;
};
