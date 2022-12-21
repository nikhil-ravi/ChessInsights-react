import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Overview from "scenes/overview";
import GameResults from "scenes/gameresults";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/gameresults" element={<GameResults />} />
              {/* <Route path="/forks" element={<Forks />} />
              <Route path="/pins" element={<Pins />} />
              <Route path="/mates" element={<Mates />} />
              <Route path="/hangingpieces" element={<HangingPieces />} />
              <Route path="/movequality" element={<MoveQuality />} />
              <Route path="/pieces" element={<Pieces />} />
              <Route path="/castling" element={<Castling />} />
              <Route path="/timeofday" element={<TimeOfDay />} />
              <Route path="/dayofweek" element={<DayOfWeek />} />
              <Route path="/geography" element={<Geography />} /> */}
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
