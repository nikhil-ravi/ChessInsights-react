import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  useTheme,
  Link,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  CalendarMonthOutlined,
  ForkLeftOutlined,
  RedeemOutlined,
  PieChartOutlined,
  CastleOutlined,
  EmojiEventsOutlined,
  SportsScoreOutlined,
  PushPinOutlined,
  TagOutlined,
  PentagonOutlined,
  CheckroomOutlined,
  WorkspacePremiumOutlined,
  AccessTimeOutlined,
  PublicOutlined,
  InsightsOutlined,
  SavedSearchOutlined,
} from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
  {
    text: "Games",
    icon: null,
  },
  {
    text: "Overview",
    icon: <SavedSearchOutlined />,
  },
  {
    text: "Game Results",
    icon: <EmojiEventsOutlined />,
  },
  {
    text: "Game Shapes",
    icon: <PentagonOutlined />,
  },
  {
    text: "Game Phases",
    icon: <SportsScoreOutlined />,
  },
  {
    text: "Tactics",
    icon: null,
  },
  {
    text: "Forks",
    icon: <ForkLeftOutlined />,
  },
  {
    text: "Pins",
    icon: <PushPinOutlined />,
  },
  {
    text: "Mates",
    icon: <TagOutlined />,
  },
  {
    text: "Hanging Pieces",
    icon: <CheckroomOutlined />,
  },
  {
    text: "Free Pieces",
    icon: <RedeemOutlined />,
  },
  {
    text: "Moves",
    icon: null,
  },
  {
    text: "Move Quality",
    icon: <WorkspacePremiumOutlined />,
  },
  {
    text: "Pieces",
    icon: <PieChartOutlined />,
  },
  {
    text: "Castling",
    icon: <CastleOutlined />,
  },
  {
    text: "Calendar",
    icon: null,
  },
  {
    text: "Time of Day",
    icon: <AccessTimeOutlined />,
  },
  {
    text: "Day of Week",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Geography",
    icon: null,
  },
  {
    text: "Opponents Map",
    icon: <PublicOutlined />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <InsightsOutlined />
                  <Typography variant="h4" fontWeight="bold">
                    Chess Insights
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeftOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText.replace(/\s/g, "")}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box position="absolute" bottom="1rem" width="95%">
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="0rem"
              m="1rem 6rem -1rem 4.5rem"
            >
              <Box
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              >
                <GitHubIcon />
              </Box>
              <Box textaling="left">
                <Typography
                  variant="body2"
                  color={theme.palette.secondary[100]}
                  fontWeight="bold"
                  sx={{ mb: "15px" }}
                >
                  <Link
                    color="inherit"
                    href="https://github.com/nikhil-ravi/ChessInsights-react"
                  >
                    GitHub
                  </Link>
                </Typography>
              </Box>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
