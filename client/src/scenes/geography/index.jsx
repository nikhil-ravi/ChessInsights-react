import React from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { useGetGeographyQuery } from "state/api";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";
import getCountryISO3 from "country-iso-2-to-3";
import Metric from "components/Metric";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessBoard } from "@fortawesome/free-solid-svg-icons";
import { LocationSearchingOutlined } from "@mui/icons-material";
import PropTypes from "prop-types";
import MarimekkoChart from "components/MarimekkoChart";
import AnalysisBreakdown from "components/AnalysisBreakdown";
import { WinIcon } from "components/ResultIcons";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};
const Geography = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyQuery();
  if (!data || isLoading) return <CircularProgress />;
  console.log(data);

  const formattedData = data.map((datum) => {
    return {
      id: getCountryISO3(datum.Country),
      value: datum.Total,
      win: datum.Win,
      draw: datum.Draw,
      loss: datum.Loss,
      winpct: datum.WinPct * 100,
      drawpct: datum.DrawPct * 100,
      losspct: datum.LossPct * 100,
      acc: datum.UserAccuracy,
    };
  });
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Geography" subtitle="List of the opponent locations" />
      <Box
        mt="40px"
        height="75vh"
        // border={`1px solid ${theme.palette.secondary[200]}`}
        // borderRadius="4px"
      >
        <ResponsiveChoropleth
          data={formattedData}
          colors={"nivo"}
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
          domain={[0, 1000]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionScale={150}
          projectionTranslation={[0.45, 0.6]}
          projectionRotation={[0, 0, 0]}
          borderWidth={1.3}
          borderColor="#ffffff"
          legends={[]}
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
                    gridTemplateColumns: "repeat(6, 0.5fr)",
                    gap: 0,
                    gridTemplateRows: "auto",
                    gridTemplateAreas: `" . . label label . ."
  " . metricGames . . metricAcc . "
  "  WDLchart WDLchart WDLchart WDLchart WDLchart WDLchart"`,
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
                    <Metric
                      icon=<FontAwesomeIcon icon={faChessBoard} size="2x" />
                      value={feature.data.value}
                      valueFontVariant="h3"
                      p=""
                    />
                  </Box>
                  <Box
                    sx={{
                      gridArea: "metricAcc",
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    <Metric
                      icon=<LocationSearchingOutlined
                        sx={{ fontSize: "30px" }}
                      />
                      value={feature.data.acc.toFixed(2)}
                      valueFontVariant="h3"
                      p=""
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

export default Geography;
