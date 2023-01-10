import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import { useGetGeographyStatsQuery } from "state/api";
import Header from "components/Header";
import getCountryISO3 from "country-iso-2-to-3";
import { AgrestiCoullLower } from "utils/AgrestiCoull";
import { TabPanel, a11yProps } from "components/TabUtils";
import { useSelector } from "react-redux";
import MyResponsiveChoropleth from "components/MyResponsiveChoropleth";

const Geography = () => {
  const theme = useTheme();
  // MUI Tab handlers
  const [value, setValue] = useState(0);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const userName = useSelector((state) => state.global.userName);
  const timeClass = useSelector((state) => state.global.timeClass);
  const startDate = useSelector((state) => state.global.startDate);
  const endDate = useSelector((state) => state.global.endDate); // SUPA DATA
  const supa_data = {
    username: userName,
    timeclass: timeClass,
    startdate: startDate,
    enddate: endDate,
  };
  const { data: geographyStats, isLoading: isGeographyStatsLoading } =
    useGetGeographyStatsQuery(supa_data);
  if (!geographyStats || isGeographyStatsLoading) return <CircularProgress />;

  const formattedDataFootballScore = geographyStats.map((datum) => {
    return {
      id: getCountryISO3(datum.Country),
      value: (datum.Win * 3 + datum.Draw * 1 - datum.Loss * 3) / datum.Total,
      total: datum.Total,
      win: datum.Win,
      draw: datum.Draw,
      loss: datum.Loss,
      winpct: datum.WinPct * 100,
      drawpct: datum.DrawPct * 100,
      losspct: datum.LossPct * 100,
      acc: datum.Accuracy,
    };
  });
  var minFootballScore = Math.min.apply(
    Math,
    formattedDataFootballScore.map(function (o) {
      return o.value;
    })
  );
  var maxFootballScore = Math.max.apply(
    Math,
    formattedDataFootballScore.map(function (o) {
      return o.value;
    })
  );
  const formattedDataAgrestiCoullLower = geographyStats.map((datum) => {
    return {
      id: getCountryISO3(datum.Country),
      value: AgrestiCoullLower({
        total: datum.Win + datum.Loss,
        wins: datum.Win,
      }),
      total: datum.Total,
      win: datum.Win,
      draw: datum.Draw,
      loss: datum.Loss,
      winpct: datum.WinPct * 100,
      drawpct: datum.DrawPct * 100,
      losspct: datum.LossPct * 100,
      acc: datum.Accuracy,
    };
  });
  var minAgrestiCoullLower = Math.min.apply(
    Math,
    formattedDataAgrestiCoullLower.map(function (o) {
      return o.value;
    })
  );
  var maxAgrestiCoullLower = Math.max.apply(
    Math,
    formattedDataAgrestiCoullLower.map(function (o) {
      return o.value;
    })
  );

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Header title="Geography" subtitle="Record against countries." />
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label={
            <Tooltip title="3 Points for a Win, 1 Point for a Draw, -3 Points for a Loss">
              <span>Points per Game</span>
            </Tooltip>
          }
          style={{ color: theme.palette.secondary[200] }}
          {...a11yProps(0)}
        />
        <Tab
          label={
            <Tooltip title="Agresti-Coull probability of winning">
              <span>Agresti-Coull Score</span>
            </Tooltip>
          }
          style={{ color: theme.palette.secondary[200] }}
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box
          gridColumn="span 12"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="1.55rem"
        >
          <MyResponsiveChoropleth
            formattedData={formattedDataFootballScore}
            domain={[minFootballScore, maxFootballScore]}
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
          gridColumn="span 12"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="1.55rem"
        >
          <MyResponsiveChoropleth
            formattedData={formattedDataAgrestiCoullLower}
            domain={[minAgrestiCoullLower, maxAgrestiCoullLower]}
          />
        </Box>
      </TabPanel>
    </Box>
  );
};

export default Geography;
