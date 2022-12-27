import { React, useState } from "react";
import { Box, useMediaQuery, CssBaseline, useTheme, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar2";
import Sidebar from "components/Sidebar2";
import { useDispatch } from "react-redux";
import { setTimeClass, setDates } from "state";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import FlexBetween from "components/FlexBetween";
import { parseISO, format } from 'date-fns';

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
        <br/>
        <FlexBetween>
        <FormControl  sx={{ mt: "1rem", minWidth: "200px" }}>
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
        
        <DateRangePicker
          onChange={item => {
            dispatch(setDates({
            startDate: format(item.selection.startDate, "yyyy-MM-dd"),
            endDate: format(item.selection.endDate, "yyyy-MM-dd")
          }))}}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={[{
            startDate: parseISO(startDate),
            endDate: parseISO(endDate),
            key: 'selection'
          }]}
          direction="horizontal"
        />;
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
