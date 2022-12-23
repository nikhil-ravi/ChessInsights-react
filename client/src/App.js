import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Overview from "scenes/overview";
import GameResults from "scenes/gameresults";
import GamePhases from "scenes/gamephases";
import Geography from "scenes/geography";
import TimeOfDay from "scenes/timeofday";
import DayOfWeek from "scenes/dayofweek";
import Pieces from "scenes/pieces";

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
              <Route path="/" element={<Navigate to="/overview" replace />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route path="/overview" element={<Overview />} />
              <Route path="/gameresults" element={<GameResults />} />
              <Route path="/gamephases" element={<GamePhases />} />
              {/* <Route path="/forks" element={<Forks />} />
              <Route path="/pins" element={<Pins />} />
              <Route path="/mates" element={<Mates />} />
              <Route path="/hangingpieces" element={<HangingPieces />} />
              <Route path="/movequality" element={<MoveQuality />} />*/}
              <Route path="/pieces" element={<Pieces />} />
              {/* <Route path="/castling" element={<Castling />} /> */}
              <Route path="/timeofday" element={<TimeOfDay />} />
              <Route path="/dayofweek" element={<DayOfWeek />} />
              <Route path="/opponentsmap" element={<Geography />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
