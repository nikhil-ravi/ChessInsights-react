import * as React from "react";
import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  CalendarMonthOutlined,
  ForkLeftOutlined,
  RedeemOutlined,
  PieChartOutlined,
  CastleOutlined,
  EmojiEventsOutlined,
  SportsScoreOutlined,
  PushPinOutlined,
  TagOutlined,
  // PentagonOutlined,
  CheckroomOutlined,
  WorkspacePremiumOutlined,
  AccessTimeOutlined,
  PublicOutlined,
  SavedSearchOutlined,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
const drawerWidth = 240;

const navItems = [
  {
    text: "Games",
    icon: null,
  },
  {
    text: "Overview",
    icon: <SavedSearchOutlined />,
    disabled: false,
  },
  {
    text: "Game Results",
    icon: <EmojiEventsOutlined />,
    disabled: false,
  },
  // {
  //   text: "Game Shapes",
  //   icon: <PentagonOutlined />,
  //   disabled: true,
  // },
  {
    text: "Game Phases",
    icon: <SportsScoreOutlined />,
    disabled: false,
  },
  {
    text: "Tactics",
    icon: null,
  },
  {
    text: "Forks",
    icon: <ForkLeftOutlined />,
    disabled: true,
  },
  {
    text: "Pins",
    icon: <PushPinOutlined />,
    disabled: true,
  },
  {
    text: "Mates",
    icon: <TagOutlined />,
    disabled: true,
  },
  {
    text: "Hanging Pieces",
    icon: <CheckroomOutlined />,
    disabled: true,
  },
  {
    text: "Free Pieces",
    icon: <RedeemOutlined />,
    disabled: true,
  },
  {
    text: "Moves",
    icon: null,
  },
  {
    text: "Move Quality",
    icon: <WorkspacePremiumOutlined />,
    disabled: true,
  },
  {
    text: "Pieces",
    icon: <PieChartOutlined />,
    disabled: false,
  },
  {
    text: "Castling",
    icon: <CastleOutlined />,
    disabled: false,
  },
  {
    text: "Calendar",
    icon: null,
  },
  {
    text: "Time of Day",
    icon: <AccessTimeOutlined />,
    disabled: false,
  },
  {
    text: "Day of Week",
    icon: <CalendarMonthOutlined />,
    disabled: false,
  },
  {
    text: "Geography",
    icon: null,
  },
  {
    text: "Opponents Map",
    icon: <PublicOutlined />,
    disabled: false,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar({ open, setOpen, drawerWidth }) {
  const theme = useTheme();
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [active, setActive] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map(({ text, icon, disabled }, index) => {
            if (!icon && open) {
              return (
                <ListItem key={text} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    key={text}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      backgroundColor: "transparent",
                      color: theme.palette.primary[100],
                    }}
                    disabled={true}
                  >
                    <ListItemText
                      primary={text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            }
            if (!icon && !open && index > 0) {
              return <Divider />;
            }
            const lcText = text.toLowerCase().replace(/\s/g, "");
            return (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  key={text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor:
                      active === lcText
                        ? theme.palette.secondary[300]
                        : "transparent",
                    color:
                      active === lcText
                        ? theme.palette.primary[600]
                        : theme.palette.secondary[100],
                  }}
                  onClick={() => {
                    navigate(`/${lcText}`);
                    setActive(lcText);
                  }}
                  disabled={disabled}
                >
                  <ListItemIcon
                    key={text}
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color:
                        active === lcText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[200],
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
