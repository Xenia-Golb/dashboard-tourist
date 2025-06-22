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
import { type TouristData } from "../types";
import { Box, Typography } from "@mui/material";
import { setHighlightedYear } from "../store/chartSlice";
import { selectChartFilters } from "../store/selectrors";

const groupedData = groupDataByYear(mockData as TouristData[]);

export function ChartComponent() {
  const dispatch = useDispatch();
  const { selectedCategory, showChildren } = useSelector(selectChartFilters);

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

  const COLORS = ["#52b9d8", "#8e7cc3", "#ea9999"];
  const totalTourists = getTotalTourists(
    mockData,
    selectedCategory !== "Все туристы" ? selectedCategory : undefined,
    showChildren
  );

  return (
    <div style={{ width: "50vw", height: "50vh" }}>
      <Box
        sx={{
          textAlign: "center",
          marginBottom: 2,
        }}
      >
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
          <XAxis dataKey="year" stroke="white" />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="white"
            label={{
              value: "Млн прибытий",
              angle: -90,
              position: "insideLeft",
              fill: "#ffffff",
            }}
          />
          <YAxis
            yAxisId="right"
            stroke="white"
            orientation="right"
            label={{
              value: "Темп прироста (%)",
              angle: 90,
              position: "insideRight",
              fill: "#ffffff",
            }}
          />
          {categoriesToShow.map((cat, index) => (
            <Bar
              key={cat}
              name={cat}
              dataKey={cat}
              stackId="a"
              barSize={70}
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
            stroke="#ffd966"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            yAxisId="right"
            unit="%"
            style={{ color: "yellow" }}
          />
          <Tooltip contentStyle={{ color: "#fff", backgroundColor: "#333" }} />
          <Legend />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
