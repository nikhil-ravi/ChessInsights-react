import { React, useState } from "react";
import { Box, useMediaQuery, CssBaseline, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar2";
import Sidebar from "components/Sidebar2";

export const Layout = () => {
  const theme = useTheme();
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
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
