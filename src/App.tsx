import { ChartComponent } from "./components";
import { FilterBar } from "./components";
import { Box, Typography } from "@mui/material";

function App() {
  return (
    <Box sx={{ margin: "150px 20px", maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Динамика туристского потока
      </Typography>
      <Box sx={{ mb: 4 }}>
        <FilterBar />
      </Box>
      <ChartComponent />
    </Box>
  );
}

export default App;
