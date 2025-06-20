import { ChartComponent } from "./components";
import { FilterBar } from "./components";
import { Box, Typography } from "@mui/material";
import "./App.css";

function App() {
  return (
    <Box
      sx={{
        mx: "auto",
      }}
    >
      <div className="app">
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Динамика туристского потока
        </Typography>
        <Box sx={{ mb: 4 }}>
          <FilterBar />
        </Box>
        <ChartComponent />
      </div>
    </Box>
  );
}

export default App;
