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
import { setTimeClass, setDates, setUserName } from "state";
import FlexBetween from "components/FlexBetween";
import { parseISO, format } from "date-fns";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const Layout = () => {
  const theme = useTheme();
  const userName = useSelector((state) => state.global.userName);
  const timeClass = useSelector((state) => state.global.timeClass);
  const startDate = useSelector((state) => state.global.startDate);
  const endDate = useSelector((state) => state.global.endDate);
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:1200px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <Navbar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        open={isSidebarOpen}
        setOpen={setIsSidebarOpen}
      />

      <Box component="main" sx={{ flexGrow: 1, p: isNonMobile ? 10 : 1 }}>
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            // padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
          }}
        />
        <br />
        <Box
          mt="20px"
          mb="20px"
          display="grid"
          gridTemplateColumns="repeat(4, 1fr)"
          gridAutoRows="80px"
          gap="20px"
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? "span 1" : "span 12",
            },
          }}
        >
          <Box
            gridColumn="span 1"
            gridRow="span 1"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: theme.spacing(0, 1),
            }}
          >
            <FormControl sx={{ mt: "1rem", minWidth: "200px" }}>
              <InputLabel>User Name</InputLabel>
              <Select
                value={userName}
                label="User Name"
                onChange={(e) => dispatch(setUserName(e.target.value))}
              >
                <MenuItem value="Honrau7">Honrau7</MenuItem>
                <MenuItem value="vampirelivesmatter">
                  vampirelivesmatter
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            gridColumn="span 1"
            gridRow="span 1"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: theme.spacing(0, 1),
            }}
          >
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
                <MenuItem value="Daily">Daily</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            gridColumn="span 2"
            gridRow="span 1"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: theme.spacing(0, 1),
            }}
          >
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
                      <TextField {...endProps} />
                    </>
                  )}
                />
              </Box>
            </LocalizationProvider>
          </Box>
        </Box>
        {/* <p>Username: {userName}</p>
        <p>Time Class: {timeClass}</p>
        <p>Start Date: {startDate}</p>
        <p>End Date: {endDate}</p> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
