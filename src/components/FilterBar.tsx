import { useDispatch, useSelector } from "react-redux";
import { setCategory, toggleChildren } from "../store/chartSlice";

import {
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
  type SelectChangeEvent,
} from "@mui/material";

import { type TouristCategory } from "../types";
import { type RootState } from "../store";

const categories: TouristCategory[] = [
  "Все туристы",
  "Граждане РФ",
  "Граждане стран ближнего зарубежья",
  "Граждане стран дальнего зарубежья",
];

export function FilterBar() {
  const dispatch = useDispatch();
  const { selectedCategory, showChildren } = useSelector(
    (state: RootState) => state.chart
  );

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value as TouristCategory;
    dispatch(setCategory(value));
  };

  const handleToggleChildren = () => {
    dispatch(toggleChildren());
  };

  return (
    <Box
      sx={{ marginBottom: 3, display: "flex", gap: 2, alignItems: "center" }}
    >
      {!showChildren && (
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            inputProps={{ "aria-label": "Без метки" }}
            sx={{
              color: "#52b9d8",
              borderColor: "#0b5394",
              backgroundColor: "#0b5394",
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Button
        variant={showChildren ? "text" : "outlined"}
        onClick={handleToggleChildren}
        sx={{
          color: showChildren ? "#fff" : "#fff",
          backgroundColor: showChildren ? "#1976d2" : "#0b5394",
        }}
      >
        {showChildren ? "Дети" : "Дети"}
      </Button>
    </Box>
  );
}
