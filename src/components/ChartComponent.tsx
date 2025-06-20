import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

import { useDispatch, useSelector } from "react-redux";
import mockData from "../data/mockdata";
import { groupDataByYear, calculateCAGR, getTotalTourists } from "../utils";
import { type TouristData, type ChartState } from "../types";
import { Box, Typography } from "@mui/material";
import { setHighlightedYear } from "../store/chartSlice";

const groupedData = groupDataByYear(mockData as TouristData[]);

export function ChartComponent() {
  const dispatch = useDispatch();
  const { selectedCategory, showChildren } = useSelector(
    (state: { chart: ChartState }) => state.chart
  );

  const filtered = groupedData.map((item) => {
    if (showChildren) {
      return {
        year: item.year,
        Дети: item.Дети || 0,
      };
    }

    if (selectedCategory !== "Все туристы") {
      return {
        year: item.year,
        [selectedCategory]: item[selectedCategory] || 0,
      };
    }

    return item;
  });

  const currentCAGR = calculateCAGR(
    groupedData,
    selectedCategory !== "Все туристы" ? selectedCategory : undefined
  );

  const chartData = filtered.map((item, i) => ({
    ...item,
    CAGR: currentCAGR[i] || 0,
  }));

  const categoriesToShow = showChildren
    ? ["Дети"]
    : selectedCategory === "Все туристы"
    ? [
        "Граждане РФ",
        "Граждане стран ближнего зарубежья",
        "Граждане стран дальнего зарубежья",
      ]
    : [selectedCategory];

  const COLORS = ["#4A90E2", "#F5A623", "#2caa32"];
  const totalTourists = getTotalTourists(
    mockData as TouristData[],
    selectedCategory !== "Все туристы" ? selectedCategory : undefined,
    showChildren
  );

  return (
    <div style={{ width: "70vw", height: 500 }}>
      <Box sx={{ textAlign: "center", marginBottom: 2 }}>
        <Typography variant="h5" component="div" gutterBottom>
          Итого: <strong>{totalTourists.toLocaleString()}</strong>
          <br />
          <small>
            {selectedCategory !== "Все туристы" && `(${selectedCategory}) `}
            {showChildren && "(только дети)"}
          </small>
        </Typography>
      </Box>
      <ResponsiveContainer>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            yAxisId="left"
            orientation="left"
            label={{
              value: "Млн прибытий",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "CAGR (%)", angle: 90, position: "insideRight" }}
          />
          {categoriesToShow.map((cat, index) => (
            <Bar
              key={cat}
              name={cat}
              dataKey={cat}
              barSize={20}
              fill={COLORS[index % COLORS.length]}
              yAxisId="left"
              onClick={(data) => {
                const year = data.year as number;
                dispatch(setHighlightedYear(year));
              }}
            ></Bar>
          ))}

          <Line
            name="CAGR (%)"
            type="monotone"
            dataKey="CAGR"
            stroke="#ff0000"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            yAxisId="right"
            unit="%"
          />

          <Tooltip />
          <Legend />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
