import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Header from "components/Header";
import { TabPanel, a11yProps } from "components/TabUtils";
import GamePhaseTabContent from "./GamePhaseTabContent";

const GamePhases = () => {
  const theme = useTheme();
  // const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  // MUI Tab handlers
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Game Phases" subtitle="" />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab
            label="Overall"
            style={{ color: theme.palette.secondary[200] }}
            {...a11yProps(0)}
          />
          <Tab
            label="By Piece Color"
            style={{ color: theme.palette.secondary[200] }}
            {...a11yProps(1)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <GamePhaseTabContent view={value} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <GamePhaseTabContent view={value} />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default GamePhases;
