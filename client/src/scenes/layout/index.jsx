import { React, useState } from "react";
import {
  Box,
  useMediaQuery,
  CssBaseline,
  useTheme,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar2";
import Sidebar from "components/Sidebar2";
import { useDispatch } from "react-redux";
import { setTimeClass, setDates } from "state";
import FlexBetween from "components/FlexBetween";
import { parseISO, format } from "date-fns";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const Layout = () => {
  const theme = useTheme();
  const timeClass = useSelector((state) => state.global.timeClass);
  const startDate = useSelector((state) => state.global.startDate);
  const endDate = useSelector((state) => state.global.endDate);
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        open={isSidebarOpen}
        setOpen={setIsSidebarOpen}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
          }}
        />
        <br />
        <FlexBetween>
          <FormControl sx={{ mt: "1rem", minWidth: "200px" }}>
            <InputLabel>Time Class</InputLabel>
            <Select
              value={timeClass}
              label="Time Class"
              onChange={(e) => dispatch(setTimeClass(e.target.value))}
            >
              <MenuItem value="Rapid">Rapid</MenuItem>
              <MenuItem value="Blitz">Blitz</MenuItem>
              <MenuItem value="Bullet">Bullet</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box width="500px" sx={{ mt: "1rem", minWidth: "200px" }}>
              <DateRangePicker
                startText="Start Date"
                endText="End Date"
                value={[startDate, endDate]}
                onChange={(newValue) =>
                  dispatch(
                    setDates([
                      format(newValue[0], "yyyy-MM-dd"),
                      format(newValue[1], "yyyy-MM-dd"),
                    ])
                  )
                }
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </>
                )}
              />
            </Box>
          </LocalizationProvider>
        </FlexBetween>
        <p>Time Class: {timeClass}</p>
        <p>Start Date: {startDate}</p>
        <p>End Date: {endDate}</p>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
