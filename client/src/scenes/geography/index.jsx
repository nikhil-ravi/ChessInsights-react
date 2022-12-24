import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Tab,
  Tabs,
  // useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import { useGetGeographyQuery } from "state/api";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";
import getCountryISO3 from "country-iso-2-to-3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessBoard } from "@fortawesome/free-solid-svg-icons";
import {
  LocationSearchingOutlined,
  ScoreboardOutlined,
} from "@mui/icons-material";
import MarimekkoChart from "components/MarimekkoChart";
import { AgrestiCoullLower } from "utils/AgrestiCoull";
import { TabPanel, a11yProps } from "components/TabUtils";
import AnalysisBreakdown from "components/AnalysisBreakdown";

const MyResponsiveChoropleth = ({ formattedData, domain }) => {
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <Box mt="40px" height="75vh">
        <ResponsiveChoropleth
          data={formattedData}
          colors={"RdYlGn"}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.secondary[200],
                fontSize: 15,
              },
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              },
            },
          }}
          features={geoData.features}
          margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
          domain={domain}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionScale={150}
          projectionTranslation={[0.5, 0.5]}
          projectionRotation={[-4, 0, 0]}
          borderWidth={1.3}
          borderColor="#ffffff"
          tooltip={({ feature }) => {
            if (!feature.data) return <></>;
            return (
              <div
                style={{
                  padding: 12,
                  background: theme.palette.primary.main,
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 0.5fr)",
                    gap: 0,
                    gridTemplateRows: "auto",
                    gridTemplateAreas: `". label label label ."
  "metricGames .  metricScore . metricAcc"
  "WDLchart WDLchart WDLchart WDLchart WDLchart"`,
                    bgcolor: theme.palette.primary.main,
                  }}
                >
                  <Box
                    sx={{
                      gridArea: "label",
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    <center>
                      <strong>{feature.label}</strong>
                    </center>
                  </Box>
                  <Box
                    sx={{
                      gridArea: "metricGames",
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    <AnalysisBreakdown
                      title="Games"
                      icon={<FontAwesomeIcon icon={faChessBoard} size="2x" />}
                      value={feature.data.total}
                    />
                  </Box>
                  <Box
                    sx={{
                      gridArea: "metricScore",
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    <AnalysisBreakdown
                      title="Score"
                      icon={<ScoreboardOutlined sx={{ fontSize: "30px" }} />}
                      value={feature.data.value.toFixed(2)}
                    />
                  </Box>
                  <Box
                    sx={{
                      gridArea: "metricAcc",
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    <AnalysisBreakdown
                      title="Accuracy"
                      icon={<LocationSearchingOutlined />}
                      value={feature.data.acc.toFixed(2)}
                    />
                  </Box>
                  <Box
                    sx={{
                      gridArea: "WDLchart",
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    <MarimekkoChart chartData={[feature.data]} />
                  </Box>
                </Box>
              </div>
            );
          }}
        />
      </Box>
    </Box>
  );
};

const Geography = () => {
  const theme = useTheme();
  // MUI Tab handlers
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { data, isLoading } = useGetGeographyQuery();
  // const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  if (!data || isLoading) return <CircularProgress />;

  const formattedDataFootballScore = data.map((datum) => {
    return {
      id: getCountryISO3(datum.Country),
      value: (datum.Win * 3 + datum.Draw * 1 - datum.Loss * 3) / datum.Total,
      wl: datum.wl,
      total: datum.Total,
      win: datum.Win,
      draw: datum.Draw,
      loss: datum.Loss,
      winpct: datum.WinPct * 100,
      drawpct: datum.DrawPct * 100,
      losspct: datum.LossPct * 100,
      acc: datum.UserAccuracy,
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
  const formattedDataAgrestiCoullLower = data.map((datum) => {
    return {
      id: getCountryISO3(datum.Country),
      value: AgrestiCoullLower({
        total: datum.Win + datum.Loss,
        wins: datum.Win,
      }),
      wl: datum.wl,
      total: datum.Total,
      win: datum.Win,
      draw: datum.Draw,
      loss: datum.Loss,
      winpct: datum.WinPct * 100,
      drawpct: datum.DrawPct * 100,
      losspct: datum.LossPct * 100,
      acc: datum.UserAccuracy,
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
